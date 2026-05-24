import { Account } from "../src/account.js";
import { assert } from "chai";

describe('Transfer operation', () => {
    describe('error case', () => {
        const alice = Account(`Alice`, `Keller`, 'IT24G0326350576WMLFI6LASP06', 100);
        const bob = Account(`Bob`, `Giovi`, 'IT42Z0330662501TY2FNOOE9BHB', 500);

        it(`should throw an error if ${alice.getName()} doesn't have enough money for the transfer`, () => {
            assert.throws(() => alice.transfer(200, bob), Error, `You don't have enough money for the transfer`);
        });
        it(`should throw an error if ${bob.getName()} doesn't have enough money for the transfer`,  () => {
            assert.throws(() => bob.transfer(900, alice), Error, `You don't have enough money for the transfer`);
        });
        it(`should throw an error if ${alice.getName()} send the money to a wrong IBAN`, () => {
            const jhon = null;
            assert.throws(() => alice.transfer(100, jhon), Error, `You should add the account to the transfer the amount`);
        }) ;
        it(`should throw an error if ${alice.getName()} send the money to herself`, () => {
            assert.throws(() => alice.transfer(100, alice), Error, `You cant transfer the money to yourself`);
        } );
    });

    describe('normal case', () => {

        describe(`Alice send the money to Bob`, () => {
            let  alice, bob, bobBalanceBeforeTransfer;
            // Runs before each `it()` test
            beforeEach(() => {
                alice = Account(`Alice`, `Keller`, 'IT24G0326350576WMLFI6LASP06', 100);
                bob = Account(`Bob`, `Giovi`, 'IT42Z0330662501TY2FNOOE9BHB', 500);
                bobBalanceBeforeTransfer = bob.getBalance();
                alice.transfer(100, bob);
            })

            it(`Alice should have -$100 after the transfer to Bob`, () => {
                assert.equal(alice.getBalance(), 0);
            });
            it(`Bob should have +$100 from previous balance $${bobBalanceBeforeTransfer} to his account`, () => {
                assert.equal(bob.getBalance(), bobBalanceBeforeTransfer + 100);
            });
            it(`Alice should have the transfer saved in the history`, () => {
                assert.include(alice.getHistory()[0], {
                    type: 'pay',
                    amount: 100,
                    userBalance: 0,
                    description: `Transfer amount: $100 to Bob Giovi`
                });
            });
        })

        describe(`Bob send the money to Alice`, () => {
            let  alice, bob, aliceBalanceBeforeTransfer;

            beforeEach(() => {
                alice = Account(`Alice`, `Keller`, 'IT24G0326350576WMLFI6LASP06', 100);
                bob = Account(`Bob`, `Giovi`, 'IT42Z0330662501TY2FNOOE9BHB', 500);
                aliceBalanceBeforeTransfer = alice.getBalance();
                bob.transfer(400, alice);
            });

            it(`Alice should have -$400 after the transfer to Bob`, () => {
                assert.equal(bob.getBalance(), 100);
            });
            it(`Bob should have +$400 from previous balance $${aliceBalanceBeforeTransfer} to his account`, () => {
                assert.equal(alice.getBalance(), aliceBalanceBeforeTransfer + 400);
            });
            it(`Bob should have the transfer saved in the history`, () => {
                assert.include(bob.getHistory()[0], {
                    type: 'pay',
                    amount: 400,
                    userBalance: 100,
                    description: `Transfer amount: $400 to Alice Keller`
                });
            });
        });
    })
})