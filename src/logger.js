import chalk from 'chalk';

export const log = {
    info: (msg) => console.log(chalk.blue.bold("[INFO]"), msg),
    success: (msg) => console.log(chalk.green.bold("[SUCCESS]"), msg),
    warn: (msg) => console.log(chalk.yellow.bold("[WARN]"), msg),
    error: (msg) => console.log(chalk.red.bold("[ERROR]"), msg),
};

export const message = {
    info: (msg) => console.log(chalk.blue.bold(msg)),
    success: (msg) => console.log(chalk.green.bold(msg)),
    warn: (msg) => console.log(chalk.yellow.bold(msg)),
    error: (msg) => console.log(chalk.red.bold(msg)),
};