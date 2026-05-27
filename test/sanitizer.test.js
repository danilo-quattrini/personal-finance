import { assert } from 'chai'
import { sanitizeNumber, sanitizeString } from "../src/sanitizer.js";

describe('Sanitizer', () => {
    describe('String', () => {
        it(`should return a sanitized string without any additional space`, () => {
            let string = '  Danilo  ';
            assert.equal(sanitizeString(string), `Danilo`);
        })
        it(`should return a sanitized string without special character`, () => {
            let string = '      !$£!$£$!"£$Danilo.-$!£%!£$£"$£!£$£        ';
            assert.equal(sanitizeString(string), `Danilo`);
        })
    })
    describe('Number', () => {
        it(`should return a sanitized number without any additional space`, () => {
            let string = '  1  ';
            assert.equal(sanitizeNumber(string), 1);
        });
    })
})