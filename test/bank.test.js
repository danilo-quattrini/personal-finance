import { assert } from "chai";
import { Account } from "../src/account.js";
import { generateIBAN } from "../src/factories/IBANgenerator.js";
import { Bank } from "../src/Bank.js";

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
            const fakeUser = { name: `Malicious`, surname: `User`, iban:`IT60 X054 2811 1010 0000 0123 456`, balance: 1000 }
            assert.throws(() => bank.add(fakeUser), Error, `Account is not defined or should be a valid one and not be empty`);
        })
        it("should return false if you try to show accounts that doesn't exists in the bank", () => {
            assert.isFalse(bank.showAccounts());
        })
        describe(`find account from index`, () => {
            it("should throw an error if the account selected from the index doesn't exists", () => {
                assert.isNull( bank.getAccount(1));
            })
        })
    })
    describe("normal cases", () => {
        let bank, user, user2, user3;
        beforeEach(() => {
            user = Account(`Danilo`, `Quattrini`, generateIBAN(`IT`), 1000)
            user2 = Account(`Lorenzo`, `Mancini`, generateIBAN(`IT`), 1000)
            user3 = Account(`Francesco`, `Rendina`, generateIBAN(`IT`), 1000)
            bank = Bank();
            bank.addMany([user, user2, user3]);
        });
        it("should not throw an error if the bank have an account", () => {
            assert.doesNotThrow(() => bank.getAccounts(), Error, `The bank is empty it doesn't have any account`);
        })
        it("should show all the account in the bank", () => {
            assert.isNotEmpty(bank.getAccounts())
        })
        it("should show the previous account added and not the fake one", () => {
            const realUser = Account(`Lorenzo`, `Recchia`, generateIBAN(`IT`), 1000)
            const fakeUser = { name: `Malicious`, surname: `User`, iban:`IT60 X054 2811 1010 0000 0123 456`, balance:1000 }
            bank.addMany([realUser, fakeUser])
            assert.deepEqual(bank.getAccounts()[3], realUser);
        })
        it("should return true if you try to show accounts", () => {
            assert.isTrue(bank.showAccounts());
        })
        describe(`find account from index`, () => {
            it("should get the account selected from the index", () => {
                assert.deepEqual(bank.getAccount(1), user2);
            })
            it("should get different account selected from the index", () => {
                assert.notDeepEqual(bank.getAccount(1), user3);
            })
        })
    })
})