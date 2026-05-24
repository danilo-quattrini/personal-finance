import {isNumber, isPositive} from './validator/validator.js'
import {save} from "./history.js";
/**
 * Remove an amount of money inside the account
 *
 * @param amount
 * @param type
 * @param {string | null} description - optional description to add at the transaction
 */
function debit(amount, type, description){
    if(! isNumber(amount) || ! isPositive(amount)) {
        throw new Error(`The amount must valid and be a positive integer`);
    }
    if(this.balance < amount){
        throw new Error(`You don't have enough balance in your account to withdraw $${amount}!`);
    }
    this.balance -= amount;
    save(this.transactionHistory, {type, amount, balance: this.balance, description});
}

/**
 * Add an amount of money inside the account
 *
 * @param amount
 * @param type
 * @param {string | null} description - optional description to add at the transaction
 */
function credit(amount, type, description){
    if(! isNumber(amount) || ! isPositive(amount)) {
        throw new Error(`The amount must valid and be a positive integer`);
    }
    this.balance += amount;
    save(this.transactionHistory, {type, amount, balance: this.balance, description});
}
/**
 * Deposit an amount of money in the user account.
 *
 * @param amount
 * @param {string | null} description - optional description to add at the transaction
 */
export function deposit(amount, description = null) {
    credit.call(this, amount, `deposit`, description);
}

/**
 * Deposit an amount of money in the user account.
 *
 * @param amount
 * @param {string | null} description - optional description to add at the transaction
 */
export function withdraw(amount, description = null) {
    debit.call(this, amount, `withdraw`, description);
}

/**
 * Pay an amount of money for something
 *
 * @param {number} amount
 * @param {string | null} description - optional description to add at the transaction
 */
export function pay(amount, description = null) {
    debit.call(this, amount, `pay`, description);
}

/**
 * Earn an amount of money for something
 *
 * @param {number} amount
 * @param {string | null} description - optional description to add at the transaction
 */
export function earn(amount, description = null) {
    credit.call(this, amount, `earn`, description);
}