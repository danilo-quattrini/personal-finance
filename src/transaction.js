import {isNumber, isPositive} from './validator/validator.js'
import {save} from "./history.js";

/**
 * Deposit an amount of money in the user account.
 * @param amount
 */
export function deposit(amount) {
    if(! isNumber(amount) || ! isPositive(amount)) {
        throw new Error(`The amount must valid and be a positive integer`);
    }
    this.balance += amount;
    save(this.transactionHistory, {type:`deposit`, amount, balance: this.balance});
}

/**
 * Deposit an amount of money in the user account.
 * @param amount
 */
export function withdraw(amount) {
    if(! isNumber(amount) || ! isPositive(amount)) {
        throw new Error(`The amount must valid and be a positive integer`);
    }
    if(this.balance < amount){
        throw new Error(`You don't have enough balance in your account to withdraw $${amount}!`);
    }
    this.balance -= amount;
    save(this.transactionHistory, {type:`withdraw`, amount, balance: this.balance});
}