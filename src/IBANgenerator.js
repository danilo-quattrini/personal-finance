import {getExpectedLength, validateCountryCode} from "./validator/isIBAN.js";
import {isString} from "./validator/validator.js";

function validate(countryCode, accountNumber) {
    if (! validateCountryCode(countryCode)) {
        throw new Error(`IBAN country code does not exist!`)
    }
    if (! isString(accountNumber)) {
        throw new Error(`Account number is mandatory!`)
    }
    if (accountNumber.length !== getExpectedLength(countryCode)) {
        throw new Error(
            `Account number for ${countryCode} must be exactly 
            ${getExpectedLength(countryCode)} characters`
        );
    }
}

/**
 * Generator of a random IBAN from a given country code and account number.
 *
 * @param {string} countryCode
 * @param {string} accountNumber
 */
export function generateIBAN(countryCode, accountNumber) {
    validate(countryCode, accountNumber);
}