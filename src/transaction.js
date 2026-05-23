import {isNumber, isPositive} from './validator/validator.js'
import {save} from "./history.js";
/**
 * Remove an amount of money inside the account
 *
 * @param amount
 * @param type
 */
function debit(amount, type){
    if(! isNumber(amount) || ! isPositive(amount)) {
        throw new Error(`The amount must valid and be a positive integer`);
    }
    if(this.balance < amount){
        throw new Error(`You don't have enough balance in your account to withdraw $${amount}!`);
    }
    this.balance -= amount;
    save(this.transactionHistory, {type, amount, balance: this.balance});
}

/**
 * Add an amount of money inside the account
 *
 * @param amount
 * @param type
 */
function credit(amount, type){
    if(! isNumber(amount) || ! isPositive(amount)) {
        throw new Error(`The amount must valid and be a positive integer`);
    }
    this.balance += amount;
    save(this.transactionHistory, {type, amount, balance: this.balance});
}
/**
 * Deposit an amount of money in the user account.
 * @param amount
 */
export function deposit(amount) {
    credit.call(this, amount, `deposit`);
}

/**
 * Deposit an amount of money in the user account.
 * @param amount
 */
export function withdraw(amount) {
    debit.call(this, amount, `withdraw`);
}