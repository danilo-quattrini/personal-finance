import { assert } from 'chai';
import {Account} from '../src/account.js';

describe('Account', () => {

    describe('error cases', () => {
        it('should throw if any account details has been provided', () => {
            assert.throws(() => new Account(null), Error);
        });
        it('should throw if the surname it\'s not inserted in the creation process', () => {
            assert.throws(() => new Account(`Danilo`, null, 100), Error);
        });
        it('should throw if the name it\'s not inserted in the creation process', () => {
            assert.throws(() => new Account(null , `Quattrini`, 100), Error);
        });
        it('should throw if initial balance is negative', () => {
            assert.throws(() => new Account(`Danilo`,`Quattrini`, -100), Error);
        });
        it('should throw if initial balance is empty', () => {
            assert.throws(() => new Account(`Danilo`,`Quattrini`, null), Error);
        });
        it('should throw and error if the name and surname strings are empty', () => {
            assert.throws(() => new Account(`  `,`  `, 100), Error);
        })
        it('should throw an error if the name is empty, but the surname is filled', () => {
            assert.throws(() => new Account(`  `,` Doe `, 100), Error);
        })
        it('should throw an error if the surname is empty, but the name is filled', () => {
            assert.throws(() => new Account(` John `,`  `, 100), Error);
        })
    });


    describe('normal cases', () => {

        it('should return the balance', () => {
            const account = new Account(`Danilo`, `Quattrini`, 100.99);
            assert.equal(account.balance, 100.99);
        })
        it('should return the name', () => {
            const account = new Account(`Danilo`, `Quattrini`, 100);
            assert.equal(account.name, `Danilo`);
        })

        it('should return the surname', () => {
            const account = new Account(`Danilo`, `Quattrini`, 100);
            assert.equal(account.surname, `Quattrini`);
        })

    })

})