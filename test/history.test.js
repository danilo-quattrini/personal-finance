import {assert} from 'chai';
import {Account} from "../src/account.js";
import {clearHistory, getAllHistoryByType, getLastOperation, operation} from "../src/history.js";

describe("History operations", () => {

    describe("error cases", () => {
        it('should throw an error if the type of operation is empty', () => {
            assert.throws(() => operation(`  `, 100, 500), Error)
            assert.throws(() => operation(null, 100, 500), Error)
            assert.throws(() => operation(undefined, 100, 500), Error)
            assert.throws(() => operation(100, 500), Error)
        })

        it('should throw an error if the operation is not a valid one', () => {
            let transactionType = 'Not a valid operation type name';
            assert.throws(() => operation(transactionType, 100, 500), Error, `Transaction type "${transactionType}" not found.`)
            transactionType = 'WithDrawD';
            assert.throws(() => operation(transactionType, 100, 500), Error, `Transaction type "${transactionType}" not found.`)
            transactionType = '   withdraw   ';
            assert.throws(() => operation(transactionType, 100, 500), Error, `Transaction type "${transactionType}" not found.`)
        })

        it('should throw an error if the amount is empty or negative', () => {
            assert.throws(() => operation(` Random Value `, 500), Error)
            assert.throws(() => operation(` Random Value `, null, 500), Error)
            assert.throws(() => operation(`Deposit`,-100, 500), Error)
        })
    })

    describe("normal cases", () => {
        let alice, bob;

        beforeEach(() => {
            alice = Account(`Alices`, `Mancini`,'IT24G0326350576WMLFI6LASP06',  100);
            bob = Account(`BobFantastic`, `Fernando`, 'IT24G0326350576WMLFI6LASP06', 300);
            alice.deposit(100);
            alice.withdraw(100);
            alice.pay(100);
            bob.withdraw(200);
            bob.deposit(500);
            bob.earn(100);
            bob.withdraw(200);
        })

        const aliceHistory = [
            operation(`deposit`, 100, 200),
            operation(`withdraw`, 100, 100),
            operation(`pay`, 100, 0),
        ]
        const bobHistory = [
            operation(`withdraw`, 200, 100),
            operation(`deposit`, 500, 600),
            operation(`earn`, 100, 700),
        ]

        it(`should return the deposit operation made by the user Alice `, () => {
            assert.include(alice.getHistory()[0], aliceHistory[0]);
        });

        it(`should return the withdraw operation made by the user Alice `, () => {
            assert.include(alice.getHistory()[1], aliceHistory[1]);
        });

        it(`should return the deposit operation made by the user Bob `, () => {
            assert.include(bob.getHistory()[0], bobHistory[0]);
        });

        it(`should return the withdraw operation made by the user Bob `, () => {
            assert.include(bob.getHistory()[1], bobHistory[1]);
        });

        it(`should return the payment operation made by the user Alice `, () => {
            const paymentHistory = alice.getHistory()[2];
            assert.equal(paymentHistory.type, aliceHistory[2].type);
            assert.equal(paymentHistory.amount, aliceHistory[2].amount);
            assert.equal(paymentHistory.userBalance, alice.getBalance());
        });

        it(`should return the earn operation on the user Bob `, () => {
            const earnHistory = bob.getHistory()[2];
            assert.equal(earnHistory.type, bobHistory[2].type);
            assert.equal(earnHistory.amount, bobHistory[2].amount);
            assert.equal(earnHistory.userBalance, bobHistory[2].userBalance);
        })

        it(`Alice can't see the history of Bob`, () => {
            assert.include(bob.getHistory()[0], bobHistory[0]);
            assert.notInclude(bob.getHistory()[0], alice.getHistory()[0]);
        })

        describe('filter operation', () => {
            it('should throw an error if the type to filter it\'s empty', () => {
                assert.throw( () => getAllHistoryByType(bob,null), Error)
                assert.throw( () => getAllHistoryByType(bob,undefined), Error)
                assert.throw( () => getAllHistoryByType(bob,``), Error)
            })
            it('should return all the withdraw operation made by Bob', () => {
                const result = getAllHistoryByType(bob, `withdraw`);

                const expected = [
                    { type: `withdraw`, amount: 200, userBalance: 100, description: null },
                    { type: `withdraw`, amount: 200, userBalance: 500, description: null },
                ];

                expected.forEach((expectedItem, index) => {
                    assert.include(result[index], expectedItem);
                })
            });
            it('should return all the deposit operation made by Bob', () => {
                const result = getAllHistoryByType(bob, `deposit`);
                const expected = [
                    { type: `deposit`, amount: 500, userBalance: 600, description: null },
                ];
                expected.forEach((expectedItem, index) => {
                    assert.include(result[index], expectedItem);
                })
            });
            it('should return an empty array for payment operation made by Bob', () => {
                const result = getAllHistoryByType(bob, `pay`);
                assert.isEmpty(result);
            });
           it('should not return any earn operation made by Alice', async () => {
                const result = getAllHistoryByType(alice, `earn`);
                assert.isEmpty(result);
            });
        })

        describe('clear history', () => {
            it('should throw an error if the account is not define ', () => {
                let john = null;
                assert.throws(() => clearHistory(john), Error, `Can clear the history, no account has been declared`)
            })
            it('should throw an error if the history is empty', () => {
                const john = Account(`Johnny`, `Doberman`, `IT24G0326350576WMLFI6LASP06`, 100)
                assert.throws(() => clearHistory(john), Error, `Can't clear the history, no operation has been made`)
            })
            it(`should return the history of Alice empty without any operation`, () => {
                clearHistory(alice);
                assert.deepEqual([], alice.getHistory());
            })
        })

        describe('last operation', () => {
            it(`should not throw a message if alice has made any operation`, () => {
                assert.doesNotThrow(() => getLastOperation(alice), Error, `You didn't made any operation yet!`);
            })
            it(`should throw a message if alice has not made any operation`, () => {
                clearHistory(alice);
                assert.throw(() => getLastOperation(alice), Error, `You didn't made any operation yet!`);
            })
            it(`should show the last operation made by Alice`, () => {
                const accountHistory = alice.getHistory();
                const lastOperationInHistory = accountHistory[accountHistory.length - 1];
                assert.include(getLastOperation(alice), lastOperationInHistory);
            })
        })
    })
})