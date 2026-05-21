import {number} from './validation.js'

/**
 * Deposit an amount of money in the user account.
 * @param amount
 */
export function deposit(amount) {
    number(amount);
    this.balance += amount;
}

/**
 * Deposit an amount of money in the user account.
 * @param amount
 */
export function withdraw(amount) {
    number(amount);
    if(this.balance < amount){
        throw new Error('You don\'t have enough balance in your account to withdraw!');
    }
    this.balance -= amount;
}