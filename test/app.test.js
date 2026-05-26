import { assert } from "chai";
import { mainMenu } from "../app.js";

describe(`App CLI`, () => {

    describe(`error cases`, () => {
        it(`should return a message if the choice is wrong`, async () => {
            const userInput = async () => '7';
            const result = await mainMenu(userInput);
            assert.equal(result , `The choice you wrote it's incorrect: 7`);
        })
    });

    describe(`normal cases`, () => {
        it(`should just terminate the process normally with 6`, async () => {
            const userInput = async () => '6';
            assert.doesNotThrow(() => mainMenu(userInput));
        })
    });
})