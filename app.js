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
=============================\n
1: Create account ${! isEmpty(bank) ? `\n2: Choose an account` : `` }
q: Quit
    `);

    const choice = await ask(`Choose an option => `);

    switch (choice.trim().toLowerCase()) {
        case "1": {
            const account = await createAccount(ask)
            if (account) {
                bank.push(account);
            }
            break;
        }
        case "q":
            return 'exit';
        default:
            log.error(`The choice you wrote it's incorrect: ${choice}`);
            return `The choice you wrote it's incorrect: ${choice}`;
    }
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