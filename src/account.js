import { isNumber, isPositive, isString, size } from './validator/validator.js'
import { sanitizeString } from "./sanitizer.js";
import { credit, debit } from './transaction.js'
import { isIBAN } from "./validator/isIBAN.js";
import { transfer } from "./transfer.js";
import { generateIBAN } from "./factories/IBANgenerator.js";
import { log, message } from "./logger.js";

/**
 * Function to validate the values
 *
 * @param {string} name
 * @param {string} surname
 * @param {string} iban
 * @param {number} balance
 */
function validate(name, surname, iban, balance) {
    if (! isString(name) || ! size(name, 5 , 255)) {
        throw new Error(`The name you insert it's not valid string (min: 6 characters long max: 255)`);
    }
    if (! isString(surname) || ! size(surname, 5 , 255)) {
        throw new Error(`The surname you insert it's not valid string \n(min: 6 characters long max: 255)`);
    }
    if (!isIBAN(iban)) {
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
        validate(name, surname, iban, Number(balance));

        if (iban) log.success(`IBAN generated successfully: ${iban}`)
        return Account(name, surname, iban, Number(balance));
    } catch(err) {
        log.error(`Something went wrong while creating your account`);
        message.error(err.message);
    }
}


export function Account(name, surname, iban, balance) {
    name = sanitizeString(name);
    surname = sanitizeString(surname);
    validate(name, surname, iban, balance);
    return {
        name,
        surname,
        iban,
        balance,
        transactionHistory: [],
        /**
         * Returns the balance of the user
         * @returns {number} the balance of the user
         */
        getBalance() {
            return this.balance;
        },
        /**
         * Returns the name of the user
         * @returns {string} the name of the user
         */
        getName() {
            return this.name;
        },
        /**
         * Returns the surname of the user
         * @returns {string} the surname of the user
         */
        getSurname() {
            return this.surname;
        },
        /**
         * Returns the surname of the user
         *
         * @returns {string} the surname of the user
         */
        getFullName() {
            return this.name + ' ' + this.surname;
        },
        /**
         * Returns the iban of the user
         *
         * @returns {string} the iban of the user
         */
        getIBAN() {
            return this.iban;
        },
        /**
         * Return an array with all the transactions made by the user.
         *
         * @returns { array } array with a list of object that represent each operation
         */
        getHistory() {
            return this.transactionHistory;
        },
        /**
         * Earn an amount of money for something
         *
         * @param {number} amount
         * @param {string | null} description - optional description to add at the transaction
         */
        earn(amount, description = null) {
            credit.call(this, amount, `earn`, description);
        },
        /**
         * Pay an amount of money in the user account.
         *
         * @param amount
         * @param {string | null} description - optional description to add at the transaction
         */
        pay(amount, description = null) {
            debit.call(this, amount, `pay`, description);
        },
        /**
         * Retrive an amount of money in the user account.
         *
         * @param amount
         * @param {string | null} description - optional description to add at the transaction
         */
        withdraw(amount, description = null) {
            debit.call(this, amount, `withdraw`, description);
        },
        /**
         * Deposit an amount of money in the user account.
         *
         * @param amount
         * @param {string | null} description - optional description to add at the transaction
         */
        deposit(amount, description = null) {
            credit.call(this, amount, `deposit`, description);
        },
        /**
         * Function that transfer an amoun of money from an account to another.
         *
         * @param {number} amount
         * @param {object} account
         */
        transfer(amount, account) {
            transfer.call(this, amount, account);
        },
    };
}
