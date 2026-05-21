import {number} from './validation.js'

/**
 * Deposit an amount of money in the user account.
 * @param amount
 */
export function deposit(amount) {
    number(amount);
    this.balance += amount;
}