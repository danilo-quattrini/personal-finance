import {number, string} from './validation.js'
import {deposit} from './transaction.js'
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
export function Account(name, surname, balance) {
    string(name);
    string(surname);
    number(balance);
    return {
        name,
        surname,
        balance,
        getBalance,
        getName,
        getSurname,
        getFullName,
        deposit,
    };
}
