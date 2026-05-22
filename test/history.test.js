import {assert} from 'chai';
import {Account} from "../src/account.js";
import {transaction} from "../src/history.js";

describe("History operations", () => {

    describe("error cases", () => {
        it('should throw an error if the type of operation is empty', () => {
            assert.throws(() => transaction(`  `, 100, 500), Error)
            assert.throws(() => transaction(null, 100, 500), Error)
            assert.throws(() => transaction(undefined, 100, 500), Error)
            assert.throws(() => transaction(100, 500), Error)
        })

        it('should throw an error if the transaction is not a valid one', () => {
            let transactionType = 'Not a valid transaction type name';
            assert.throws(() => transaction(transactionType, 100, 500), Error, `Transaction type "${transactionType}" not found.`)
            transactionType = 'WithDrawD';
            assert.throws(() => transaction(transactionType, 100, 500), Error, `Transaction type "${transactionType}" not found.`)
            transactionType = '   withdraw   ';
            assert.throws(() => transaction(transactionType, 100, 500), Error, `Transaction type "${transactionType}" not found.`)
        })

        it('should throw an error if the amount is empty or negative', () => {
            assert.throws(() => transaction(` Random Value `, 500), Error)
            assert.throws(() => transaction(` Random Value `, null, 500), Error)
            assert.throws(() => transaction(`Deposit`,-100, 500), Error)
        })
    })

    describe("normal cases", () => {
        const user = Account(`Francesco`, `Mancini`, 100);

        const historyToCheck = [
            transaction(`deposit`, 100, 200),
            transaction(`withdraw`, 100, 100),
        ]
        it(`should return the deposit operation made by the user ${user.getFullName()} `, () => {
            user.deposit(100);
            assert.include(user.getHistory()[0], historyToCheck[0]);
        });

        it(`should return the withdraw operation made by the user ${user.getFullName()} `, () => {
            user.withdraw(100);
            assert.include(user.getHistory()[1], historyToCheck[1]);
        });

    })
})