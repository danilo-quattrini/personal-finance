import { assert } from 'chai';
import { isIBAN } from "../src/validator/isIBAN.js";
import {generateIBAN} from "../src/IBANgenerator.js";

describe('IBAN validation', () => {
    describe('error cases', () => {
        it('should return false for null', () => {
            assert.isFalse(isIBAN(null));
        })
        it('should return false for unknown country code', () => {
            assert.isFalse(isIBAN('XX00 1234 5678'));
        })
        it('should return false for wrong format', () => {
            assert.isFalse(isIBAN('IT00 0000'));
        })
        it('should return false for invalid checksum', () => {
            assert.isFalse(isIBAN('IT00 X054 2811 1010 0000 0123 456'));
        })
    })

    describe('normal cases', () => {
        it('should return true for valid Italian IBAN', () => {
            assert.isTrue(isIBAN('IT60 X054 2811 1010 0000 0123 456'));
        })
        it('should handle IBANs without spaces', () => {
            assert.isTrue(isIBAN('IT60X0542811101000000123456'));
        })
    })
})

describe('IBAN Generator', () => {
    describe('error cases', () => {
        it('should throw an error if the IBAN country code is not given', () => {
            const countryCode = "";
            const accountNumber = "13413";
            assert.throws(() => generateIBAN(countryCode, accountNumber), Error, `IBAN country code is mandatory!`)
        });
        it('should throw an error if the IBAN country code is wrong',() => {
            const countryCode = "XYZ";
            const accountNumber = "13413";
            assert.throws(() => generateIBAN(countryCode, accountNumber), Error, `IBAN country code does not exist!`)
        });
        it('should throw an error if the account number is empty',() => {
            const countryCode = "IT";
            const accountNumber = "";
            assert.throws(() => generateIBAN(countryCode, accountNumber), Error, `Account number is mandatory!`)
        });
    })
})