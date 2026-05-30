import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { mainMenu } from "./src/menu.js";

const rl = readline.createInterface({ input, output });

export async function ask(question) {
    return await rl.question(question);
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