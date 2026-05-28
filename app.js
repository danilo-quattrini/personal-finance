import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { createAccount } from "./src/account.js";
import { log } from "./src/logger.js";
import { Bank } from "./src/Bank.js";

const rl = readline.createInterface({ input, output });
const bank = new Bank();

async function ask(question) {
    return await rl.question(question);
}

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
                console.log(bank.getAccounts())
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
    await ask(`Press enter to continue `);
    await mainMenu(ask);
}

/**
 * Function that runs forever until the user is going to
 * select the proper choice to exit from the loop;
 *
 * @returns {Promise<void>}
 */
async function run() {
    while(true) {
        const result = await mainMenu(ask);
        if(result === 'exit') {
            console.log(`Goodbye!`);
            rl.close();
            break;
        }
    }
}

run();