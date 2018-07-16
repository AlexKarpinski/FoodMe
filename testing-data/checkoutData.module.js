'use strict';
let helper = require('../helper/helper.js')
module.exports = {

    cardTypes: [
        {type: 'visa'}, {type: 'mc'}, {type: 'amex'}, {type: 'discover'}],

    /* cardTypes: {
         'Visa card': {type: 'visa'},
         'MasterCard': {type: 'mc'},
         'Amex card': {type: 'amex'},
         'Discover card': {type: 'discover'},
     },
 */
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
    ],

    invalidExpireDate: [
        {
            description: 'Invalid date length (between 1 and 7)',
            symbolSet: helper.getRandomNumeric(helper.getRandomInt(4, 2))
        },
        {
            description: 'Invalid date length (1 char)',
            symbolSet: helper.getRandomNumeric(1)
        },
        {
            description: 'Invalid date value (7 random special symbols)',
            symbolSet: helper.getSpecialSymbol(7)
        },
        {
            description: 'Invalid date value (7 random letters)',
            symbolSet: helper.getRandomLetter(7)
        },
        {
            description: 'Invalid date value (7 random Chinese Characters',
            symbolSet: helper.getRandomChineseCharacters(7)
        }
    ],

    invalidCvc: [
        {
            description: 'Invalid cvc length (1 char)',
            symbolSet: helper.getRandomNumeric(1)
        },
        {
            description: 'Invalid card number length (2 chars)',
            symbolSet: helper.getRandomNumeric(2)
        },
        {
            description: 'Invalid card number value (3 random special symbols)',
            symbolSet: helper.getSpecialSymbol(3)
        },
        {
            description: 'Invalid card number value (3 random letters)',
            symbolSet: helper.getRandomLetter(3)
        },
        {
            description: 'Invalid card number value (3 random Chinese Characters',
            symbolSet: helper.getRandomChineseCharacters(3)
        }
    ],

}
