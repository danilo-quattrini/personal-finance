import {getExpectedLength, lettersToNumbers, mod97, rearrange, validateCountryCode} from "../validator/isIBAN.js";
import {isString} from "../validator/validator.js";
import {generateRandomString} from "./stringGenerator.js";

function validate(countryCode, accountNumber) {
    if(! isString(countryCode)) {
        throw new Error(`IBAN country code is mandatory!`)
    }
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
 * Generate a valid structured account number based on the country's regex rules
 *
 * @param {string} countryCode
 * @returns {string}
 */
export function generateAccountNumber(countryCode) {
    const code = countryCode.toUpperCase();

    switch (code) {
        case 'DE':
            return generateRandomString('digits', 18);

        case 'GB':
            return generateRandomString('letters', 4) + generateRandomString('digits', 14);

        case 'IT':
            return generateRandomString('letters', 1) +
                generateRandomString('digits', 10) +
                generateRandomString('mixed', 12);

        case 'FR':
            return generateRandomString('digits', 10) +
                generateRandomString('mixed', 11) +
                generateRandomString('digits', 2);

        default:
            const length = getExpectedLength(code) || 18;
            return generateRandomString('digits', length);
    }
}

/**
 * Calculates the checksum for the IBAN.
 *
 * @param {string} countryCode - for the Iban
 * @param {string} accountNumber
 *
 * @returns {string} The calculated checksum.
 */
function calculateChecksum(countryCode, accountNumber) {
    const temp = rearrange(countryCode + '00' + accountNumber);
    const numeric = lettersToNumbers(temp);
    const remainder = mod97(numeric);
    return (98 - remainder).toString().padStart(2, '0');
}

/**
 * Generator of a random IBAN from a given country code and account number.
 *
 * @param {string} countryCode
 */
export function generateIBAN(countryCode) {
    const accountNumber = generateAccountNumber(countryCode);
    validate(countryCode, accountNumber);
    const checksumValue = calculateChecksum(countryCode, accountNumber);
    return countryCode + checksumValue + accountNumber;
}