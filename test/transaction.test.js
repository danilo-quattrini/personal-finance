import {assert} from 'chai';
import {Account} from "../src/account.js";
import {history} from "../src/transaction.js";
describe('Transaction operation', () => {

    describe('error cases', () => {

        describe('deposit operation', () => {
            const user = Account(`Lorenzo`, `Mangione`, 0);
            it('should throw an error if the amount to deposit it\'s negative', () => {
                assert.throws(() => user.deposit(-1), Error)
            })

            it('should throw an error if the amount to deposit it\'s empty', () => {
                assert.throws(() => user.deposit(), Error)
            })
        })
        describe('withdraw operation', () => {
            const user = Account(`Lorenzo`, `Mangione`, 50);
            it('should throw an error if the amount to withdraw it\'s negative', () => {
                assert.throws(() => user.withdraw(-1), Error)
            })

            it('should throw an error if the amount to withdraw it\'s empty', () => {
                assert.throws(() => user.withdraw(), Error)
            })

            it('should throw an error if the user doesn\'t have enough money in the balance to withdraw the desire amout', () => {
                assert.throws(() => user.withdraw(100), Error)
            })
        })

        describe('history operation', () => {
            it('should throw an error if the type of operation is empty', () => {
                assert.throws(() => history(`  `, 100, 500), Error)
                assert.throws(() => history(null, 100, 500), Error)
                assert.throws(() => history(undefined, 100, 500), Error)
                assert.throws(() => history(100, 500), Error)
            })

            it('should throw an error if the transaction is not a valid one', () => {
                let transactionType = 'Not a valid transaction type name';
                assert.throws(() => history(transactionType, 100, 500), Error, `Transaction type "${transactionType}" not found.`)
                transactionType = 'WithDrawD';
                assert.throws(() => history(transactionType, 100, 500), Error, `Transaction type "${transactionType}" not found.`)
                transactionType = '   withdraw   ';
                assert.throws(() => history(transactionType, 100, 500), Error, `Transaction type "${transactionType}" not found.`)
             })

            it('should throw an error if the amount is empty or negative', () => {
                assert.throws(() => history(` Random Value `, 500), Error)
                assert.throws(() => history(` Random Value `, null, 500), Error)
                assert.throws(() => history(`Deposit`,-100, 500), Error)
            })
        })
    });

    describe('normal cases', () => {

        describe('deposit operation', () => {

            const user = Account(`Francesco`, `Mancini`, 100);
            it('should return the balance with the new amount inserted', () => {
                user.deposit(100);
                assert.equal(user.getBalance(), 200);
            })

            for (let i = 0; i < 5; i++) {
                const amountToDeposit = 1 + Math.random() * (100 - 1);
                it(`should return the balance with $${amountToDeposit.toFixed(2)} more`, () => {
                    const expectedBalance = user.getBalance() + amountToDeposit;
                    user.deposit(amountToDeposit);
                    assert.equal(user.getBalance(), expectedBalance);
                })
            }

        })

        describe('withdraw operation', () => {

            const user = Account(`Francesco`, `Mancini`, 100);

            it('should return the new balance with the amount withdrawn', () => {
                assert.equal(user.getBalance(), 100);
                user.withdraw(100);
                assert.equal(user.getBalance(), 0);
            })
        })
    })

})