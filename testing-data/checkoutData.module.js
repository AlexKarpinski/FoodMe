'use strict';
let helper = require('../helper/helper.js')
module.exports = {
/*
    cardTypes: [
        {type: 'visa'}, {type: 'mc'}, {type: 'amex'}, {type: 'discover'}],
*/
    cardTypes: {
        'Visa card': {type: 'visa'},
        'MasterCard': {type: 'mc'},
        'Amex card': {type: 'amex'},
        'Discover card': {type: 'discover'},
    },

    invalidCardNumbers: [
        {
            description: 'Invalid card number length (between 1 and 16)',
            symbolSet: helper.getRandomNumeric(helper.getRandomInt(13, 2))
        },
        {
            description: 'Invalid card number length (1 char)',
            symbolSet: helper.getRandomNumeric(1)
        },
        {
            description: 'Invalid card number value (16 random special symbols)',
            symbolSet: helper.getSpecialSymbol(16)
        },
        {
            description: 'Invalid card number value (16 random letters)',
            symbolSet: helper.getRandomLetter(16)
        },
        {
            description: 'Invalid card number value (16 random Chinese Characters',
            symbolSet: helper.getRandomChineseCharacters(16)
        }
    ]
}
