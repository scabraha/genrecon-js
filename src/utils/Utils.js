/**
 * Determines if the supplied parameter is a non empty array
 * @param {Array} [array] The variable to check.
 * @returns {Boolean} True if the supplied array parameter is defined, an array, and has a length of
 * at least 1. False otherwise.
 */
export const isNonEmptyArray = array => Array.isArray(array) && array.length;
