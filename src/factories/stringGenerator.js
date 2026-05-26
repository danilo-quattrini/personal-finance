import {isNumber, isString} from "../validator/validator.js";
const validType = [
    'digits',
    'letters',
    'mixed'
]

/**
 * Validate the type and the length to generate a string
 * .
 * @param type
 * @param length
 */
function validate(type, length) {
    if(! isString(type)){
        throw new Error(`The type must be a valid string and not empty`);
    }
    if(! (validType.includes(type)) ){
        throw new Error(`Type is not valid, should be 'digits', 'letters' or 'mixed'`);
    }
    if(! isNumber(length)){
        throw new Error(`The length of the string to generate should be a valid number and not empty`);
    }
    if(length <= 0){
        throw new Error(`The length of the string to generate should be more than 0`);
    }
}

/**
 * Helper to generate a random string of a specific type
 *
 * @param {string} type - 'digits', 'letters', or 'mixed'
 * @param {number} length
 * @returns {string}
 */
export function generateRandomString(type, length) {
    validate(type, length);
    const digits = '0123456789';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let chars = letters + digits;

    if (type === 'digits') chars = digits;
    if (type === 'letters') chars = letters;

    return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
}