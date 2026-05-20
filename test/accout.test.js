import { assert } from 'chai';
import {Account} from '../src/account.js';

describe('Account', () => {

    describe('error cases', () => {
        it('should throw if any account details has been provided', () => {
            assert.throws(() => Account(null), Error);
        });
        it('should throw if the surname it\'s not inserted in the creation process', () => {
            assert.throws(() => Account(`Danilo`, null, 100), Error);
        });
        it('should throw if the name it\'s not inserted in the creation process', () => {
            assert.throws(() => Account(null , `Quattrini`, 100), Error);
        });
        it('should throw if initial balance is negative', () => {
            assert.throws(() => Account(`Danilo`,`Quattrini`, -100), Error);
        });
        it('should throw if initial balance is empty', () => {
            assert.throws(() => Account(`Danilo`,`Quattrini`, null), Error);
        });
    });

})