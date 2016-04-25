/**
 * A Lisp List is considered as a JavaScript Array
 *
 * JavaScript naming conventions have been followed
 */

/**
 * P01 (*) Find the last box of a list.
 * Example:
 *  * (my-last '(a b c d))
 *    (D)
 */
function myLast( list ) {
  return list[ list.length ] || null;
}

/**
 * P02 (*) Find the last but one box of a list.
 * Example:
 *  * (my-but-last '(a b c d))
 *    (C D)
 */
function myButLast( list ) {
  return list.slice( -2 );
}

/**
 * P03 (*) Find the K'th element of a list.
 * The first element in the list is number 1.
 * Example:
 *  * (element-at '(a b c d e) 3)
 *    C
 */
function elementAt( list, position ) {
  return list[ position - 1 ] || null;
}

/**
 * P04 (*) Find the number of elements of a list.
 */
function listLength( list ) {
  return list.length || 0;
}

/**
 * P05 (*) Reverse a list.
 */
function listReverse( list ) {
  return list.reverse( );
}

/**
 * P06 (*) Find out whether a list is a palindrome.
 * A palindrome can be read forward or backward; e.g. (x a m a x).
 */
function isPalindrome( list ) {
  var len = list.length,
    last = len - 1,
    mid = len / 2,
    i = 0;

  for ( ; i < mid; i++ ) {
    if ( list[ i ] !== list[ last - i ] ) {
      return false;
    }
  }

  return true;
}

/**
 * P07 (**) Flatten a nested list structure.
 * Transform a list, possibly holding lists as elements into a `flat' list by replacing each list with its elements (recursively).
 *
 * Example:
 *  * (my-flatten '(a (b (c d) e)))
 *    (A B C D E)
 */
function myFlatten( list ) {
  var out = [ ],
    len = list.length,
    i = 0;

  for ( ; i < len; i++ ) {
    if ( Array.isArray( list[ i ] ) ) {
      out = out.concat( myFlatten( list[ i ] ) );
    } else {
      out.push( list[ i ] );
    }
  }

  return out;
}

/**
 * P08 (**) Eliminate consecutive duplicates of list elements.
 * If a list contains repeated elements they should be replaced with a single copy of the element. The order of the elements should not be changed.
 *
 * Example:
 *  * (compress '(a a a a b c c a a d e e e e))
 *    (A B C A D E)
 */
function compress( list ) {
  list = myFlatten( list );

  return list.filter( function ( element, index ) {
    return element !== list[ index - 1 ];
  } );
}

/**
 * P09 (**) Pack consecutive duplicates of list elements into sublists.
 * If a list contains repeated elements they should be placed in separate sublists.
 *
 * Example:
 *  * (pack '(a a a a b c c a a d e e e e))
 *    ((A A A A) (B) (C C) (A A) (D) (E E E E))
 */
function pack( list ) {
  list = myFlatten( list );

  var out = [ ],
    last = [ ],
    len = list.length,
    i = 0;

  for ( ; i < len; i++ ) {
    if ( i === 0 || list[ i ] === list[ i - 1 ] ) {
      last.push( list[ i ] );
    } else {
      out.push( last );
      last = [ list[ i ] ];
    }
  }
  out.push( last );

  return out;
}

/**
 * P10 (*) Run-length encoding of a list.
 * Use the result of problem P09 to implement the so-called run-length encoding data compression method. Consecutive duplicates of elements are encoded as lists (N E) where N is the number of duplicates of the element E.
 *
 * Example:
 *  * (encode '(a a a a b c c a a d e e e e))
 *    ((4 A) (1 B) (2 C) (2 A) (1 D)(4 E))
 */
function encode( list ) {
  list = pack( list );

  return list.map( function ( element ) {
    return [ element.length, element[ 0 ] ];
  } );
}

/**
 * P11 (*) Modified run-length encoding.
 * Modify the result of problem P10 in such a way that if an element has no duplicates it is simply copied into the result list. Only elements with duplicates are transferred as (N E) lists.
 *
 * Example:
 *  * (encode-modified '(a a a a b c c a a d e e e e))
 *    ((4 A) B (2 C) (2 A) D (4 E))
 */
function encodeModified( list ) {
  list = pack( list );

  return list.map( function ( element ) {
    return element.length > 1 ? [ element.length, element[ 0 ] ] : element[ 0 ];
  } );
}

/**
 * P12 (**) Decode a run-length encoded list.
 * Given a run-length code list generated as specified in problem P11. Construct its uncompressed version.
 */
function decode( list ) {
  var out = [ ],
    len = list.length,
    i = 0;

  for ( ; i < len; i++ ) {
    if ( Array.isArray( list[ i ] ) ) {
      out = out.concat( ( new Array( list[ i ][ 0 ] ) )
        .fill( list[ i ][ 1 ] ) );
    } else {
      out.push( list[ i ] );
    }
  }

  return out;
}

/**
 * P13 (**) Run-length encoding of a list (direct solution).
 * Implement the so-called run-length encoding data compression method directly. I.e. don't explicitly create the sublists containing the duplicates, as in problem P09, but only count them. As in problem P11, simplify the result list by replacing the singleton lists (1 X) by X.
 *
 * Example:
 *  * (encode-direct '(a a a a b c c a a d e e e e))
 *    ((4 A) B (2 C) (2 A) D (4 E))
 */
function encodeDirect( list ) {
  list = myFlatten( list );

  var out = [ ],
    len = list.length,
    last = list[ 0 ],
    count = 1,
    i = 1;

  for ( ; i < len; i++ ) {
    if ( last !== list[ i ] ) {
      out.push( count > 1 ? [ count, last ] : last );
      count = 1;
      last = list[ i ];
    } else {
      count++;
    }
  }
  out.push( count > 1 ? [ count, last ] : last );

  return out;
}

/**
 * P14 (*) Duplicate the elements of a list.
 * Example:
 *  * (dupli '(a b c c d))
 *    (A A B B C C C C D D)
 */
function dupli( list ) {
  return myFlatten( list.map( function ( element ) {
    return [ element, element ];
  } ) );
}

/**
 * P15 (**) Replicate the elements of a list a given number of times.
 * Example:
 *  * (repli '(a b c) 3)
 *    (A A A B B B C C C)
 */
function repli( list, k ) {
  return myFlatten( list.map( function ( element ) {
    return ( new Array( k ) )
      .fill( element );
  } ) );
}

/**
 * P16 (**) Drop every N'th element from a list.
 * Example:
 *  * (drop '(a b c d e f g h i k) 3)
 *    (A B D E G H K)
 */
function drop( list, n ) {
  list = myFlatten( list );

  return list.filter( function ( element, index ) {
    return ( index + 1 ) % n;
  } );
}

/**
 * P17 (*) Split a list into two parts; the length of the first part is given.
 * Do not use any predefined predicates.
 *
 * Example:
 *  * (split '(a b c d e f g h i k) 3)
 *    ( (A B C) (D E F G H I K))
 */
function split( list, k ) {
  list = myFlatten( list );

  return [ list.slice( 0, k ), list.slice( k ) ];
}

/**
 * P18 (**) Extract a slice from a list.
 * Given two indices, I and K, the slice is the list containing the elements between the I'th and K'th element of the original list (both limits included). Start counting the elements with 1.
 *
 * Example:
 *  * (slice '(a b c d e f g h i k) 3 7)
 *    (C D E F G)
 */
function slice( list, i, k ) {
  list = myFlatten( list );

  return list.slice( i - 1, k );
}

/**
 * P19 (**) Rotate a list N places to the left.
 * Examples:
 *  * (rotate '(a b c d e f g h) 3)
 *    (D E F G H A B C)
 *
 *  * (rotate '(a b c d e f g h) -2)
 *  (G H A B C D E F)
 *
 *  Hint: Use the predefined functions length and append, as well as the result of problem P17.
 */
function rotate( list, n ) {
  list = split( list, n );

  return ( list[ 1 ] )
    .concat( list[ 0 ] );
}

/**
 * P20 (*) Remove the K'th element from a list.
 * Example:
 *  * (remove-at '(a b c d) 2)
 *    (A C D)
 */
function removeAt( list, k ) {
  list = myFlatten( list );

  return list.filter( function ( element, index ) {
    return index !== k - 1;
  } );
}

/**
 * P21 (*) Insert an element at a given position into a list.
 * Example:
 *  * (insert-at 'alfa '(a b c d) 2)
 *    (A ALFA B C D)
 */
function insertAt( element, list, k ) {
  list = myFlatten( list );

  var out = list.slice( 0, k - 1 );
  out.push( element );

  return out.concat( list.slice( k - 1 ) );
}

/**
 * P22 (*) Create a list containing all integers within a given range.
 * If first argument is smaller than second, produce a list in decreasing order.
 * Example:
 *  * (range 4 9)
 *    (4 5 6 7 8 9)
 */
function range( start, finish ) {
  var out = [],
    dir = finish - start > 0 ? 1 : -1;

  while( start !== finish ) {
    out.push( start );
    start += dir;
  }
  out.push( start );

  return out;
}
