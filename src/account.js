function numberValidation(number) {
    if(number < 0 && !isNaN(number)) {
     throw new Error(`Number must be a positive integer`);
    }
    return number.toFixed(2);
}
function stringValidation(value) {
    if (!value && typeof value !== 'string') {
        throw new Error(`Value must be a valid string`);
    }
}
export function Account(name, surname, balance) {
    stringValidation(name);
    stringValidation(surname);
    numberValidation(balance);
    return{
        name,
        surname,
        balance,
    };
}
