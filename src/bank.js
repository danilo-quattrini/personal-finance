import { isAccount, isEmpty } from "./validator/validator.js";
import { log } from "./logger.js";

/**
 * Create a new bank object to contains accounts
 *
 * @returns {object} the bank without any account in it
 */
export function Bank() {
    return {
        accounts : [],
        add,
        addMany,
        getAccounts,
    }
}

/**
 * Add a new account inside the bank
 *
 * @param {object} account the user to add in the bank
 */
export function add(account) {
    if ( isEmpty(account) || ! isAccount(account) ) {
        throw new Error("Account is not defined or should be a valid one and not be empty");
    }
    this.accounts.push(account);
}
/**
 * Add an array of new accounts to inside the bank
 *
 * @param {array} accounts array of accounts to add in the bank
 */
export function addMany(accounts) {
    accounts.forEach(account => {
        if ( isEmpty(account) || ! isAccount(account) ) {
            return log.error(`${Object.values(account)} not added to the bank for invalid format or emptiness`);
        }
        this.accounts.push(account);
    })
}

/**
 * Get all the accounts inside the bank
 *
 * @return {array} all the accounts in the bank
 */
export function getAccounts() {
    if(isEmpty(this.accounts)) {
        throw new Error(`The bank is empty it doesn't have any account`)
    }
    return this.accounts;
}