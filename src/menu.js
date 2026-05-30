import { createAccount } from "./account.js";
import { isNumber } from "./validator/validator.js";
import { log } from "./logger.js";
import { Bank } from "./Bank.js";

const bank = new Bank();
let currentAccount = null;

export async function mainMenu(ask) {
    console.log(`
=============================
    Personal Finance CLI
=============================
1: Create account
2: Choose an account
q: Quit
    `);

    const choice = await ask(`Choose an option => `);

    switch (choice.trim().toLowerCase()) {
        case "1": {
            const account = await createAccount(ask)
            if (account) {
                bank.add(account);
            }
            break;
        }
        case "2":
            try {
                if(! bank.showAccounts()) break;
                const choice = await ask(`Choose an account from its number => `);
                const selectedAccountIndex = Number(choice.trim());

                if (! isNumber(selectedAccountIndex)) {
                    log.error('Invalid index. Please enter a valid number.');
                    break;
                }

                currentAccount = bank.getAccount(selectedAccountIndex);

                if (! currentAccount) {
                    log.error(`The account doesn't exist or you picked a wrong choice`);
                    break;
                }
                console.log(currentAccount)
            } catch(err) {
                log.error(err.message);
            }
            break;

        case "q":
            return 'exit';
        default:
            log.error(`The choice you wrote it's incorrect: ${choice}`);
            return `The choice you wrote it's incorrect: ${choice}`;
    }
    await mainMenu(ask);
}
