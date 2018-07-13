'use strict';
let helper = require('../testing-data/Helper.js')
module.exports = {
    cardTypes: {
        'Visa card': {type: 'visa'},
        'MasterCard': {type: 'mc'},
        'Amex card': {type: 'amex'},
        'Discover card': {type: 'discover'},
    },

    invalidCardNumbers:{
        'Invalid card number length (between 1 and 16)': {symbolSet: helper.getRandomNumeric(helper.getRandomInt(13, 2))},
        'Invalid card number length (1 char)': {symbolSet: helper.getRandomNumeric(1)},
        'Invalid card number value (16 random special symbols)': {symbolSet: helper.getSpecialSymbol(16)},
        'Invalid card number value (16 random letters)': {symbolSet: helper.getRandomLetter(16)},
        'Invalid card number value (16 random Chinese Characters)': {symbolSet: helper.getRandomChineseCharacters(16)}
    }
}
