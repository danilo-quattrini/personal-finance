import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

async function ask(question) {
    return await rl.question(question);
}

async function mainMenu() {
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
            console.log(`Goodbye!`);
            rl.close();
            return ;
        default:
            console.log(`The choice you wrote it's incorrect: ${choice}`);
    }

    await mainMenu();
}

mainMenu();