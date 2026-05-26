import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { createAccount } from "./src/account.js";

const rl = readline.createInterface({ input, output });
const bank = [];

async function ask(question) {
    return await rl.question(question);
}

export async function mainMenu(ask) {
    console.log(`
            =============================
                Personal Finance CLI
            =============================
            1. Create account
            2. Deposit
            3. Withdraw
            4. Transfer
            5. View history
            6. Exit
    `);

    const choice = await ask(`Choose an option => `);

    switch (choice.trim()) {
        case "1":
            bank.push(await createAccount(ask));
            break;
        case "2":
            break;
        case "3":
            break;
        case "4":
            break;
        case "5":
            break;
        case "6":
            return 'exit';
        default:
            console.log(`✗  The choice you wrote it's incorrect: ${choice}`)
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