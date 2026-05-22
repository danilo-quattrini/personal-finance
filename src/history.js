import {isNumber, isPositive, isString, transactionType} from "./validator.js";
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
 * Function to validate the values
 * @param type
 * @param amount
 * @param balance
 */
function validate(type, amount, balance) {
    if (!isString(type)) {
        throw new Error(`The name you insert it's not valid`);
    }
    if (!isNumber(amount) || !isPositive(amount)) {
        throw new Error(`The name you insert it's not valid`);
    }
    if (!isNumber(balance) || !isPositive(balance)) {
        throw new Error('Invalid balance');
    }
}
/**
 * Return a history object that track of all the operation made into the account
 * @param {string} type
 * @param {number} amount
 * @param {number} balance
 * @returns {{type: *, amount: *, userBalance: *}}
 */
export function transaction(type, amount, balance) {
    validate(type, amount, balance);
    transactionType(type);
    return {
        [id]: Math.random().toString(16).slice(2),
        type,
        amount: amount,
        userBalance: balance,
    }
}