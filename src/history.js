import {number, string, transactionType} from "./validator.js";
const id = Symbol("Transaction identifier");

/**
 * Save into an array of history the object of type transaction
 * @param history
 * @param element
 */
export function save(history, element) {
    history.push(transaction(element.type, element.amount, element.balance));
}
/**
 * Return a history object that track of all the operation made into the account
 * @param {string} type
 * @param {number} amount
 * @param {number} balance
 * @returns {{type: *, amount: *, userBalance: *}}
 */
export function transaction(type, amount, balance) {
    string(type);
    number(amount);
    number(balance);
    transactionType(type);
    return {
        [id]: Math.random().toString(16).slice(2),
        type,
        amount: amount,
        userBalance: balance,
    }
}