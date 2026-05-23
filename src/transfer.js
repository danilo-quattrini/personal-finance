import {deepEqual, isNumber, isPositive} from "./validator/validator.js";

function validate(amount, account) {
    if (!account) {
        throw new Error(`You should add the account to the transfer the amount`);
    }
    if (!isNumber(amount) || !isPositive(amount)) {
        throw new Error('Amount must be a number and a positive integer');
    }
    if (this.getBalance() < amount) {
        throw new Error(`You don't have enough money for the transfer`);
    }
    if (deepEqual(this, account)) {
        throw new Error(`You cant transfer the money to yourself`);
    }
}

/**
 * Function that transfer an amoun of money from an account to another.
 *
 * @param {number} amount
 * @param {object} account
 */
export function transfer(amount, account) {
    validate.call(this, amount, account);
    this.pay(amount);
    account.earn(amount);
}