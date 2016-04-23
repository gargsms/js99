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
      out = out.concat( list[ i ] );
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
    return [ element.length, element[0] ];
  } );
}
