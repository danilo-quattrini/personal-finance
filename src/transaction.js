import {number} from './validation.js'

/**
 * Deposit an amount of money in the user account.
 * @param account
 * @param amount
 */
export function deposit(account, amount) {
    number(amount);
    account.balance += amount;
}