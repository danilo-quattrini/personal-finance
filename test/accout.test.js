import { assert } from 'chai';
import {Account} from '../src/account.js';

describe('Account', () => {

    describe('error cases', () => {

        it('should throw if any account details has not been provided', () => {
            assert.throws(() => Account(null), Error);
        });

        describe('name & surname', () => {
            it('should throw if the name it\'s not inserted in the creation process', () => {
                assert.throws(() => Account(null , `Quattrini`, 100), Error);
            });
            it('should throw if the surname it\'s not inserted in the creation process', () => {
                assert.throws(() => Account(`Danilo`, null, 100), Error);
            });
            it('should throw and error if the name and surname strings are empty', () => {
                assert.throws(() => Account(`  `,`  `, 100), Error);
            })
            it('should throw an error if the name is empty, but the surname is filled', () => {
                assert.throws(() => Account(`  `,` Doe `, 100), Error);
            })
            it('should throw an error if the surname is empty, but the name is filled', () => {
                assert.throws(() => Account(` John `,`  `, 100), Error);
            })
        })

        describe('balance', () => {
            it('should not throw an error if the balance it\'s 0', () => {
                assert.doesNotThrow(() => Account(`Danilo`,`Quattrini`, 0), Error);
            });
            it('should throw if initial balance is negative', () => {
                assert.throws(() => Account(`Danilo`,`Quattrini`, -100), Error);
            });
            it('should throw if initial balance is empty', () => {
                assert.throws(() => Account(`Danilo`,`Quattrini`, null), Error);
            });
        })
      });

    describe('normal cases', () => {

        it('should return the balance', () => {
            const account = Account(`Danilo`, `Quattrini`, 100.99);
            assert.equal(account.getBalance(), 100.99);
        })
        it('should return the name', () => {
            const account = Account(`Danilo`, `Quattrini`, 100);
            assert.equal(account.getName(), `Danilo`);
        })

        it('should return the surname', () => {
            const account = Account(`Danilo`, `Quattrini`, 100);
            assert.equal(account.getSurname(), `Quattrini`);
        })

        it('should return the full name', () => {
            const account = Account(`Danilo`, `Quattrini`, 100);
            assert.equal(account.getFullName(), `Danilo Quattrini`);
        })

    })

})