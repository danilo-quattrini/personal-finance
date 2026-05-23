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
        const alice = Account(`Alice`, `Mancini`,'IT24G0326350576WMLFI6LASP06',  100);
        const bob = Account(`Bob`, `Fernando`, 'IT24G0326350576WMLFI6LASP06', 300);

        const aliceHistory = [
            transaction(`deposit`, 100, 200),
            transaction(`withdraw`, 100, 100),
        ]
        const bobHistory = [
            transaction(`withdraw`, 200, 100),
            transaction(`deposit`, 500, 600),
        ]
        it(`should return the deposit operation made by the user ${alice.getFullName()} `, () => {
            alice.deposit(100);
             assert.include(alice.getHistory()[0], aliceHistory[0]);
        });

        it(`should return the withdraw operation made by the user ${alice.getFullName()} `, () => {
            alice.withdraw(100);
            assert.include(alice.getHistory()[1], aliceHistory[1]);
        });

        it(`user ${alice.getFullName()} can't see the history of ${bob.getFullName()}`, () => {
            bob.withdraw(200);
            assert.include(bob.getHistory()[0], bobHistory[0]);
            assert.notInclude(bob.getHistory()[0], alice.getHistory()[0]);
        })

    })
})