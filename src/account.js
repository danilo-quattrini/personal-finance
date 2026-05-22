import {number, string} from './validation.js'
import {deposit, withdraw} from './transaction.js'
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
 * Return an array with all the transactions made by the user.
 * @returns {[]} array with a list of object that represent each transaction
 */
function getHistory() {
    return this.transactionHistory;
}
export function Account(name, surname, balance) {
    string(name);
    string(surname);
    number(balance);
    return {
        name,
        surname,
        balance,
        transactionHistory: [],
        getBalance,
        getName,
        getSurname,
        getFullName,
        getHistory,
        deposit,
        withdraw,
    };
}
