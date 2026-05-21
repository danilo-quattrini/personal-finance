/**
 * Return a number with fixed decimal approximation, throw an error
 * if the number it is not valid
 * @param number
 * @returns {string}
 */
function numberValidation(number) {
    if(number < 0 && !isNaN(number)) {
     throw new Error(`Number must be a positive integer`);
    }
    return number.toFixed(2);
}

/**
 * Validate if the given value it's a valid string and it's not empty
 * @param value
 */
function stringValidation(value) {
    value = value.trim();
    if(value.length === 0) {
        throw new Error(`The string cannot be empty`);
    }
    if (!value && typeof value !== 'string') {
        throw new Error(`Value must be a valid string`);
    }
}

/**
 * Returns the balance of the user
 * @returns {number} the balance of the user
 */
function getBalance() {
    return this.balance;
}
/**
 * Returns the name of the user
 * @returns {string} the name of the user
 */
function getName() {
    return this.name;
}

/**
 * Returns the surname of the user
 * @returns {string} the surname of the user
 */
function getSurname() {
    return this.surname;
}

/**
 * Returns the surname of the user
 * @returns {string} the surname of the user
 */
function getFullName() {
    return this.name + ' ' + this.surname;
}
export function Account(name, surname, balance) {
    stringValidation(name);
    stringValidation(surname);
    numberValidation(balance);
    return {
        name,
        surname,
        balance,
        getBalance,
        getName,
        getSurname,
        getFullName,
    };
}
