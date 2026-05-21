/**
 * Return a number with fixed decimal approximation, throw an error
 * if the number it is not valid
 * @param number
 * @returns {string}
 */
export function number(number) {
    if(number < 0 && !isNaN(number)) {
        throw new Error(`Number must be a positive integer`);
    }
    return number.toFixed(2);
}

/**
 * Validate if the given value it's a valid string and it's not empty
 * @param value
 */
export function string(value) {
    value = value.trim();
    if(value.length === 0) {
        throw new Error(`The string cannot be empty`);
    }
    if (!value && typeof value !== 'string') {
        throw new Error(`Value must be a valid string`);
    }
}
