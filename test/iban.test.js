import { assert } from 'chai';
import { isIBAN } from "../src/validator/isIBAN.js";
import { generateIBAN } from "../src/factories/IBANgenerator.js";

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
            assert.throws(() => generateIBAN(countryCode), Error, `IBAN country code is mandatory!`)
        });
        it('should throw an error if the IBAN country code is wrong',() => {
            const countryCode = "XYZ";
            assert.throws(() => generateIBAN(countryCode), Error, `IBAN country code does not exist!`)
        });
    })

    describe('normal cases', () => {
        it('should generate a valid Iban number for Italy', () => {
            const countryCode = "IT";
            const iban = generateIBAN(countryCode);
            assert.isTrue(isIBAN(iban));
        });

        it('should generate a valid Iban number for France', () => {
            const countryCode = "FR";
            const iban = generateIBAN(countryCode);
            assert.isTrue(isIBAN(iban));
        });

        it('should generate a valid Iban number for Germany', () => {
            const countryCode = "DE";
            const iban = generateIBAN(countryCode);
            assert.isTrue(isIBAN(iban));
        });

        it('should generate a valid Iban number for Great Britain', () => {
            const countryCode = "GB";
            const iban = generateIBAN(countryCode);
            assert.isTrue(isIBAN(iban));
        });

        it('should generate a valid Iban number for other country', () => {
            const countryCode = "CZ";
            const iban = generateIBAN(countryCode);
            assert.isTrue(isIBAN(iban));
        });
    })
})