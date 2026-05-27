# Personal Finance

Personal Finance is a command-line application written entirely in JavaScript.
It allows users to create and manage personal bank accounts, perform financial operations such as deposits, withdrawals, 
and transfers between accounts, and track a full transaction history.

The project was built as a practical exercise to consolidate core JavaScript 
concepts including factory functions, closures, modules, Symbols, async/await, and test-driven development.

---

## Features

- Create a personal account with name, surname, and an initial balance ✅
- Automatic IBAN generation based on a country code, following the official specification defined by the [International Bank Account Number standard](https://en.wikipedia.org/wiki/International_Bank_Account_Number) ✅
- Input validation with clear error messages for every field ✅
- Deposit, withdraw, pay, and earn operations with balance tracking 🛠️ (to define in the CLI)
- Transfer money between two accounts by providing the target account 🛠️ (to define in the CLI)
- Full transaction history per account, filterable by operation type 🛠️ (to define in the CLI)
- Interactive CLI menu using Node.js readline 🛠️ (to define in the CLI)

---

## Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0

---

## Installation

Clone the repository:

```bash
git clone https://github.com/danilo-quattrini/personal-finance.git
cd personal-finance
```

Install dependencies:

```bash
npm install
```

---

## Usage

Start the interactive CLI:

```bash
npm start
```

You will be presented with a menu to create accounts, perform operations, and view transaction history.

---

## Testing

The project uses [Mocha](https://mochajs.org/) as the test runner and [Chai](https://www.chaijs.com/) as the assertion library, following a BDD (Behavior Driven Development) approach.

Run the full test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

---

## Linting

The project uses [ESLint](https://eslint.org/) with the recommended ruleset for JavaScript. The configuration targets Node.js globals and warns on unused variables and undefined references.

Run the linter:

```bash
npx eslint .
```

---

## Author

Danilo Quattrini 

## License

MIT