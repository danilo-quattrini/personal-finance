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
})