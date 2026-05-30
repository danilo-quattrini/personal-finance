import { isAccount, isEmpty } from "./validator/validator.js";
import { log } from "./logger.js";

/**
 * Create a new bank object to contains accounts
 *
 * @returns {object} the bank without any account in it
 */
export function Bank() {
    return {
        accounts: [],
        /**
         * Show all the accounts that are inside the bank
         */
        showAccounts () {
            try {
                const accounts = this.getAccounts();
                console.log(`| # | Full Name | IBAN | Balance |`);
                accounts.forEach((account, index) => {
                    console.log(`| ${index} | ${account.name} ${account.surname} | ${account.iban}  | $${account.balance} |`);
                });
                return true;
            } catch (error) {
                log.error(error.message);
                return false;
            }
        },
        /**
         * Add a new account inside the bank
         *
         * @param {object} account the user to add in the bank
         */
        add (account) {
            if ( isEmpty(account) || ! isAccount(account) ) {
                throw new Error("Account is not defined or should be a valid one and not be empty");
            }
            this.accounts.push(account);
        },
        /**
         * Add an array of new accounts to inside the bank
         *
         * @param {array} accounts array of accounts to add in the bank
         */
        addMany (accounts) {
            accounts.forEach(account => {
                if ( isEmpty(account) || ! isAccount(account) ) {
                    return log.error(`${Object.values(account)} not added to the bank for invalid format or emptiness`);
                }
                this.accounts.push(account);
            })
        },
        /**
         * Get all the accounts inside the bank
         *
         * @return {array} all the accounts in the bank
         */
        getAccounts () {
            if(isEmpty(this.accounts)) {
                throw new Error(`The bank is empty it doesn't have any account`)
            }
            return this.accounts;
        },
        /**
         * Return a single account from an index give to the function argument
         *
         * @param {number} indexToFind of the account to get from the bank.
         * @return {object} account that returns from the selected index
         */
        getAccount (indexToFind) {
            const accountFound =  this.accounts.find((account, index) => index === indexToFind)
            return accountFound ?? null;
        },
    }
}