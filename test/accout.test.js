import { assert } from 'chai';
import {Account} from '../src/account.js';

describe('Account', () => {

    describe('error cases', () => {

        it('should throw if any account details has not been provided', () => {
            assert.throws(() => Account(null), Error);
        });

        describe('name & surname', () => {
            it('should throw if the name it\'s not inserted in the creation process', () => {
                assert.throws(() => Account(null , `Quattrini`,`IT60 X054 2811 1010 0000 0123 456`,100), Error);
            });
            it('should throw if the surname it\'s not inserted in the creation process', () => {
                assert.throws(() => Account(`Danilo`, null, `IT60 X054 2811 1010 0000 0123 456`, 100), Error);
            });
            it('should throw and error if the name and surname strings are empty', () => {
                assert.throws(() => Account(`  `,`  `, `IT60 X054 2811 1010 0000 0123 456`,  100), Error);
            })
            it('should throw an error if the name is empty, but the surname is filled', () => {
                assert.throws(() => Account(`  `,` Doe `, `IT60 X054 2811 1010 0000 0123 456`, 100), Error);
            })
            it('should throw an error if the surname is empty, but the name is filled', () => {
                assert.throws(() => Account(` John `,`  `, `IT60 X054 2811 1010 0000 0123 456`,100), Error);
            })
        })

        describe('balance', () => {
            it('should not throw an error if the balance it\'s 0', () => {
                assert.doesNotThrow(() => Account(`Danilo`,`Quattrini`, 'IT60 X054 2811 1010 0000 0123 456', 0), Error);
            });
            it('should throw if initial balance is negative', () => {
                assert.throws(() => Account(`Danilo`,`Quattrini`, 'IT60 X054 2811 1010 0000 0123 456', -100), Error);
            });
            it('should throw if initial balance is empty', () => {
                assert.throws(() => Account(`Danilo`,`Quattrini`, 'IT60 X054 2811 1010 0000 0123 456', null), Error);
            });
        })

        describe('iban', () => {
            it('should return false for invalid checksum', () => {
                assert.throws(() => Account(`Danilo`,`Quattrini`, 'IT00 X054 2811 1010 1 456', 10000), Error, `The IBAN you insert it's not a valid fo`);
            });
            it('should throw an error if the IBAN is in the wrong format', () => {
                assert.throws(() => Account(`Danilo`,`Quattrini`, 'IT00 0000', 10000), Error, `The IBAN you insert it's not a valid fo`);
            });
        })
      });

    describe('normal cases', () => {

        it('should return the balance', () => {
            const account = Account(`Danilo`, `Quattrini`, 'IT60 X054 2811 1010 0000 0123 456', 100.99);
            assert.equal(account.getBalance(), 100.99);
        })
        it('should return the name', () => {
            const account = Account(`Danilo`, `Quattrini`, 'IT60 X054 2811 1010 0000 0123 456', 100);
            assert.equal(account.getName(), `Danilo`);
        })

        it('should return the surname', () => {
            const account = Account(`Danilo`, `Quattrini`, 'IT60 X054 2811 1010 0000 0123 456', 100);
            assert.equal(account.getSurname(), `Quattrini`);
        })

        it('should return the full name', () => {
            const account = Account(`Danilo`, `Quattrini`, 'IT60 X054 2811 1010 0000 0123 456', 100);
            assert.equal(account.getFullName(), `Danilo Quattrini`);
        })

        it('should return the IBAN', () => {
            const account = Account(`Danilo`, `Quattrini`, 'IT60 X054 2811 1010 0000 0123 456', 100);
            assert.equal(account.getIBAN(), 'IT60 X054 2811 1010 0000 0123 456');
        })

    })

})