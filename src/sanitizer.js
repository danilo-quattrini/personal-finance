import { isString } from "./validator/validator.js";

/**
 * Return a string sanitized
 *
 * @param str string to sanitize
 * @returns {string} string sanitized
 */
export function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü]/gim,"");
    return str.trim();
}

/**
 * Return a number sanitized if it's a string
 *
 * @param number number to sanitize
 * @returns {number} string sanitized
 */
export function sanitizeNumber(number){
    if(isString(number)) return Number(number);
}