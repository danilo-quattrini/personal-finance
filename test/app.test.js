import { assert } from "chai";
import { mainMenu } from "../app.js";

xdescribe(`App CLI`, () => {

    xdescribe(`error cases`, () => {
        xit(`should return a message if the choice is wrong`, async () => {
            const userInput = async () => '7';
            const result = await mainMenu(userInput);
            assert.equal(result , `The choice you wrote it's incorrect: 7`);
        })
    });

    xdescribe(`normal cases`, () => {
        xit(`should just terminate the process normally with 6`, async () => {
            const userInput = async () => 'q';
            assert.doesNotThrow(() => mainMenu(userInput));
        })
    });
})