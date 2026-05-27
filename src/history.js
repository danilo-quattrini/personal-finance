import {isNumber, isPositive, isString, transactionType} from "./validator/validator.js";
const id = Symbol("Transaction identifier");

/**
 * Save into an array of history the object of type operation
 * @param history
 * @param element
 */
export function save(history, element) {
    history.push(operation(element.type, element.amount, element.balance, element?.description));
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
 *
 * @param {string} type
 * @param {number} amount
 * @param {number} balance
 * @param {string| null} description optional description to add at the history operation
 * @returns {{type: *, amount: *, userBalance: *}}
 */
export function operation(type, amount, balance, description = null) {
    validate(type, amount, balance);
    transactionType(type);
    return {
        [id]: Math.random().toString(16).slice(2),
        type,
        amount: amount,
        userBalance: balance,
        description,
        date: new Date().toLocaleString(),
    }
}

/**
 * Find all the operation inside the history by type.
 *
 * @param account - the account to get the history type we wants
 * @param {string} type - type of operation to find in the history.
 */

export function getAllHistoryByType(account, type){
    if(!isString(type)){
        throw new Error(`The type must be valid string`);
    }
    return account.getHistory().filter((record) => record.type === type);
}

/**
 * Get the recent / last operation made by the user in the history
 *
 * @param {object} account - account of the user to get the last history element
 * @return {object} the last element in the history
 */
export function getLastOperation(account) {
    if(isArrayEmpty(account.getHistory())) {
        throw  new Error(`You didn't made any operation yet!`);
    }
    const historyLength = account.getHistory().length;
    return account.getHistory()[historyLength - 1];
}

/**
 * Clear all the history from a user
 *
 * @param {object} account - account of the user to clean the history
 */
export function clearHistory(account) {
    if(isEmpty(account)) {
        throw  new Error(`Can clear the history, no account has been declared`);
    }
    const accountHistory = account.getHistory();
    if(isArrayEmpty(accountHistory)) {
        throw  new Error(`Can't clear the history, no operation has been made`);
    }
    accountHistory.splice(0);
}