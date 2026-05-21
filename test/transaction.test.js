import {assert} from 'chai';
import {deposit} from '../src/transaction.js'
import {Account} from "../src/account.js";
describe('Transaction operation', () => {

    describe('error cases', () => {

        describe('deposit operation', () => {
            const user = new Account(`Lorenzo`, `Mangione`, 0);
            it('should throw an error if the amount to deposit it\'s negative', () => {
                assert.throws(() => deposit(user, -1), Error)
            })

            it('should throw an error if the amount to deposit it\'s empty', () => {
                assert.throws(() => deposit(user), Error)
            })
        })

    });

    describe('normal cases', () => {

        describe('deposit operation', () => {

            const user = new Account(`Francesco`, `Mancini`, 100);
            it('should return the balance with the new amount inserted', () => {
                deposit(user, 100);
                assert.equal(user.getBalance(), 200);
            })

        })
    })

})