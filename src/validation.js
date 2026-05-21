/**
 * Return a number with fixed decimal approximation, throw an error
 * if the number it is not valid
 * @param number
 * @returns {string}
 */
export function number(number) {
    if(isNaN(number) || number === null || number === undefined) {
        throw new Error(`Value must be a valid number`);
    }
    if(number < 0) {
        throw new Error(`Number must be a positive integer`);
    }
    return number.toFixed(2);
}

/**
 * Validate if the given value it's a valid string and it's not empty
 * @param value
 */
export function string(value) {
    if(value === null || value === undefined || typeof value !== 'string') {
        throw new Error(`Value must be a valid string`);
    }
    if(value.trim().length === 0) {
        throw new Error(`The string cannot be empty`);
    }
}
