/**
 * Check if a number is a positive integer and finite.
 * @param number
 * @returns {false|true}
 */
export function isPositive(number) {
    return number > -1 && Number.isFinite(number);
}
/**
 * Check if a value is null or undefined.
 * @param value
 * @returns {false|true}
 */
export function isEmpty(value) {
    return value === null || value === undefined;
}

/**
 * Check if an array is empty, meaning the length of it
 * is 0
 * 
 * @param {array} array array to check if is empty or not
 */
export function isArrayEmpty(array) {
    return array.length === 0;
}

/**
 * Check if a number is into a valid format
 *
 * @param number
 * @returns {boolean}
 */
export function isNumber(number) {
    return ! isEmpty(number) && typeof number === 'number';
}

/**
 * Check if a given string value respect a min and a max length
 * @param value
 * @param min
 * @param max
 * @returns {boolean}
 */
export function size(value, min = 0, max = Infinity) {
    return value.length > min && value.length <= max;
}

/**
 * Return a string sanitized
 * @param str string to sanitize
 * @returns {string} string sanitized
 */
export function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü .,_-]/gim,"");
    return str.trim();
}
/**
 * Validate if the given value it's a valid string and it's not empty
 * @param string
 */
export function isString(string) {
    if(isEmpty(string)) return false;
    const sanitizedString = sanitizeString(string);
    return typeof sanitizedString === 'string' && size(sanitizedString);
}

/**
 * Check if the operation it's into a valid type
 *
 * @param type the type of operation passed to the function
 */
export function transactionType(type) {
    const operations = ['withdraw', 'deposit', 'pay', 'earn'];
    if (!operations.includes(type.toLowerCase())) {
        throw Error(`Transaction type "${type}" not found.`);
    }
}

/**
 * Check if two object are equals or not
 *
 * @param {object} obj1 first objet to compare
 * @param {object} obj2 second object to compare
 * @return {boolean} true|false
 */

export function deepEqual(obj1, obj2) {
    return (obj1 && obj2 && typeof obj1 === 'object' && typeof obj2 === 'object') ?
        (Object.keys(obj1).length === Object.keys(obj2).length) &&
        Object.keys(obj1).reduce( function(isEqual, key) {
            return isEqual && deepEqual(obj1[key], obj2[key]);
        }, true) : (obj1 === obj2);
}