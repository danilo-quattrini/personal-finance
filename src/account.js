import {isNumber, isPositive, isString} from './validator/validator.js'
import {deposit, withdraw, pay, earn} from './transaction.js'
import { isIBAN } from "./validator/isIBAN.js";
import { transfer } from "./transfer.js";
import { generateIBAN } from "./factories/IBANgenerator.js";
/**
 * Returns the balance of the user
 * @returns {number} the balance of the user
 */
function getBalance() {
    return this.balance;
}
/**
 * Returns the name of the user
 * @returns {string} the name of the user
 */
function getName() {
    return this.name;
}

/**
 * Returns the surname of the user
 * @returns {string} the surname of the user
 */
function getSurname() {
    return this.surname;
}

/**
 * Returns the surname of the user
 * @returns {string} the surname of the user
 */
function getFullName() {
    return this.name + ' ' + this.surname;
}

/**
 * Returns the iban of the user
 * @returns {string} the iban of the user
 */
function getIBAN() {
    return this.iban;
}
/**
 * Return an array with all the transactions made by the user.
 * @returns {[]} array with a list of object that represent each operation
 */
function getHistory() {
    return this.transactionHistory;
}

/**
 * Function to validate the values
 *
 * @param {string} name
 * @param {string} surname
 * @param {string} iban
 * @param {number} balance
 */
function validate(name, surname, iban, balance) {
    if (!isString(name)) {
        throw new Error(`The name you insert it's not valid`);
    }
    if (!isString(surname)) {
        throw new Error(`The surname you insert it's not valid`);
    }
    if(!isIBAN(iban)) {
        throw new Error(`The IBAN you insert it's not a valid format`);
    }
    if (!isNumber(balance) || !isPositive(balance)) {
        throw new Error('Invalid balance');
    }
}
/**
 * Async function that return an account object from user input.
 *
 * @param {function} ask
 * @returns a new account object
 */
export async function createAccount(ask){
    try {
        const name = await ask(`Write your name => `);
        const surname = await ask(`Write your surname => `);
        const balance = await ask(`Insert an initial balance for your account => `);
        const countryCode = await ask(`Insert your country code \n(IT = Italy, GB = Great Britain, FR = France, ecc..) => `);
        const iban = generateIBAN(countryCode);

        if(iban) console.log(`✔ IBAN generated successfully: ${iban}`)
        return Account(name, surname, iban, +balance);
    } catch(err) {
        console.log(`✗ Something went wrong while creating account: ${err.message}`);
        console.log(err);
    }
}


export function Account(name, surname, iban, balance) {
    validate(name, surname, iban, balance);
    return {
        name,
        surname,
        iban,
        balance,
        transactionHistory: [],
        getBalance,
        getName,
        getSurname,
        getIBAN,
        getFullName,
        getHistory,
        deposit,
        withdraw,
        pay,
        earn,
        transfer,
    };
}
