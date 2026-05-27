import { assert } from "chai";
import { Account } from "../src/account.js";
import { generateIBAN } from "../src/factories/IBANgenerator.js";
import { Bank } from "../src/bank.js";

describe("Bank Test", () => {
    describe("error cases", () => {
        let bank;
        beforeEach(() => {
            bank = Bank();
        } )
        it("should throw an error if the bank doesn't have any account", () => {
            assert.throws(() => bank.getAccounts(), Error, `The bank is empty it doesn't have any account`);
        })
        it("should throw an error if you try to enter in the bank with a fake account", () => {
            const fakeUser = { name: `Malicious`, surname: `User`, iban:`IT60 X054 2811 1010 0000 0123 456`, balance:1000 }
            assert.throws(() => bank.add(fakeUser), Error, `Account is not defined or should be a valid one and not be empty`);
        })
    })
    describe("normal cases", () => {
        let bank, user;
        beforeEach(() => {
            user = Account(`Danilo`, `Quattrini`, generateIBAN(`IT`), 1000)
            bank = Bank();
            bank.add(user);
        });
        it("should not throw an error if the bank have an account", () => {
            assert.doesNotThrow(() => bank.getAccounts(), Error, `The bank is empty it doesn't have any account`);
        })
        it("should show all the account in the bank", () => {
            console.log(bank.getAccounts())
            assert.isNotEmpty(bank.getAccounts())
        })
    })
})