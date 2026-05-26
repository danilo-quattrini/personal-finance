import { assert } from "chai";
import {generateRandomString} from "../src/factories/stringGenerator.js";

describe('Random string generation', () => {

    describe('error cases', () => {
        it('should throw an error if the type and length is empty', () => {
            assert.throws(() => generateRandomString(), Error);
        })
        it('should throw an error if the type is not valid', () => {
            assert.throws(() => generateRandomString('letterAndDigit', 1), Error, `Type is not valid, should be 'digits', 'letters' or 'mixed'`);
        })
        it('should throw an error if the length is empty', () => {
            assert.throws(() => generateRandomString('digits'), Error);
        })
        it('should throw an error if the type is empty', () => {
            assert.throws(() => generateRandomString(null, 1), Error);
        })
        it('should throw an error if the length is 0', () => {
            assert.throws(() => generateRandomString('digits', 0), Error, `The length of the string to generate should be more than 0`);
        })
    })

    describe('normal cases', () => {
        it('should return a random number string with only 5 digits', () => {
            assert.isNotEmpty(generateRandomString('digits', 5).match(/\b[0-9]{5}\b/g))
        })
        it('should return a random letters string with only 5 digits', () => {
            assert.isNotEmpty(generateRandomString('letters', 5).match(/\b[A-Z]{5}\b/g))
        })
        it('should not return a random letters string with only 5 digits', () => {
            assert.isNull(generateRandomString('mixed', 5).match(/\b[A-Z]{5}\b/g))
        })
        it('should return a random letters + number string with only 5 digits', () => {
            assert.isNotNull(generateRandomString('mixed', 5).match(/\b[A-Z0-9]{5}\b/g))
        })
    })
})