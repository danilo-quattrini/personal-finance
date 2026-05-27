import { assert } from 'chai'
import { isAccount, isEmpty, isNumber, isPositive, size } from "../src/validator/validator.js";
describe(`Validator`, () => {
    describe(`Numbers`, () => {
        it(`should return false if the isNumber has empty value`, () => {
            assert.isFalse(isNumber());
        })
        it(`should return false if the number is in a string format`, () => {
            assert.isFalse(isNumber('1'));
        })
        it(`should not return false if the number is into a good format`, () => {
            assert.isNotFalse(isNumber( 1));
        })
        it(`should return false if the number is negative`, () => {
            assert.isFalse(isPositive(-1));
        })
        it(`should return false if the number is infinte`, () => {
            assert.isFalse(isPositive(Infinity));
        })
        it(`should return true if the number is positive`, () => {
            assert.isTrue(isPositive(100));
        })
        it(`should return true if the number is not infinite`, () => {
            assert.isTrue(isPositive(100));
        })
        it(`should not return false for 0 that's a positive number`, () => {
            assert.isNotFalse(isPositive(0));
        })
    })

    describe(`Strings`, () => {
        it(`should return true if the string is undefined or null`, () => {
            let string = null;
            assert.isTrue(isEmpty(string));
            string = undefined;
            assert.isTrue(isEmpty(string));
        })
        it(`should return false if the string is not null or undefined`, () => {
            let string = 'random string';
            assert.isFalse(isEmpty(string));
        })
        it(`should return false if the string is not greater than 5`, () => {
            let string = 'John';
            assert.isFalse(size(string, 5));
        })
        it(`should return true if the string is greater than 5`, () => {
            let string = 'Danilo';
            assert.isTrue(size(string, 5));
        })
        it(`should return false if the string is greater than 100`, () => {
            let longString = 'DaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDaniloDanilo';
            assert.isFalse(size(longString, 5,100));
        })
    })

    describe(`Account`, () => {
        it(`should return false if the account is not an object (string)`, () => {
            const account = `Danilo Quattrini`
            assert.isFalse(isAccount(account));
        })
        it(`should return false if the account is not an object (number)`, () => {
            const account = 1
            assert.isFalse(isAccount(account));
        })
        it(`should return false if the account is not an object (boolean)`, () => {
            const account = false
            assert.isFalse(isAccount(account));
        })
        it(`should return false if the account is an object but doesn't have the same keys`, () => {
            const account = {}
            assert.isFalse(isAccount(account));
        })
        it(`should return false if the account is faked without the right keys`, () => {
            const account = { name: `Malicious`, surname: `User`, iban:`IT60 X054 2811 1010 0000 0123 456`, balance:1000 };
            assert.isFalse(isAccount(account));
        })
    })
})