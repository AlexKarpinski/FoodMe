let homePage = require('../pages/homePage.js');
let orderPage = require('../pages/orderPage.js');
let helper = require('../helper/helper.js');
var dateFormat = require('dateformat');
let checkoutPage = function () {

    const NEGATIVE_COLOR = '#E9322D'
    let checkoutButton = element(by.xpath("//div[@ng-show = 'cart.items.length']"));
    let inputCardTypeField = element(by.xpath("//select[@name = 'ccType']"));
    let cardNumberField = element(by.xpath("//input[@name = 'ccNum']"));
    let expireDateField = element(by.xpath("//input[@name = 'ccExp']"));
    let cvcField = element(by.xpath("//input[@name = 'ccCvc']"));
    let purchaseButton = element(by.xpath("//ng-view/form/div/div[2]/div/button[@ng-click = 'purchase()']"));

    const MIN_CARD_EXPIRATION_DATE = new Date();
    const MAX_CARD_EXPIRATION_DATE = new Date(2025, 0, 1);

    this.reload = function () {
        browser.refresh()
    };

    this.clickCheckoutButton = function () {
        checkoutButton.click()
    };
    this.generateValidCardNumber = async function () {
        return helper.getRandomNumeric(16)
    };

    this.setCardNumber = async function (cardNumberValue) {
        await cardNumberField.sendKeys(cardNumberValue)
    };

    this.generateValidExpireDate = () => {
        let expireDate = new Date(MIN_CARD_EXPIRATION_DATE.getTime() +
            Math.random() * (MAX_CARD_EXPIRATION_DATE.getTime() - MIN_CARD_EXPIRATION_DATE.getTime()));
        return dateFormat(expireDate, "mm/yyyy");
    };

    this.setExpireDate = function (expireDate) {
        expireDateField.sendKeys(expireDate)
    };

    this.generateValidCvc = function () {
        return helper.getRandomNumeric(3);
        cvcField.sendKeys(cvcValue)

    };
    this.setCvc = function (cvcValue) {
        cvcField.sendKeys(cvcValue)
    };

    this.selectCardType = async function (cardType) {
        browser.wait(EC.visibilityOf(inputCardTypeField), 10000);
        await inputCardTypeField.$(`[value="${cardType}"]`).click()
    };

    this.isPurchaseButtonEnabled = async function () {
        return purchaseButton.isEnabled()
    };

    this.getCardNumberInputBorderColor = async function () {
        //let color = cardNumberField.getCssValue('border-color')
        return await cardNumberField.getCssValue('border-color')
    }

    this.clickPurchaseButton = async function () {
        await  purchaseButton.click()
    };


    this.checkColor = async function () {
        let color = cardNumberField.getCssValue('border-color')
        let isEqual = (await cardNumberField.getCssValue('border-color') == 'rgb(233, 50, 45)')
        logger.info("Color==============" + isEqual)
        /* if ((await color).toString() === 'rgb(233, 50, 45)') {
             return true
         }*/
        return false

    };


    /*this.isBorderColorEqualTo = async function (expectedColor) {
       // let isEqual = false
        let color = await cardNumberField.getCssValue('border-color')
        console.log("is borderColorEqual:====" + await color)
        let isEqual = ((await color) == expectedColor)
        console.log("isTrue or false: " +  isEqual)
        return await isEqual
    };*/


    this.isEqual = async function () {
        let isEqual = false
        let color = cardNumberField.getCssValue('border-color')
        isEqual = (await cardNumberField.getCssValue('border-color') == 'rgb(233, 50, 45)')
        logger.info("compare========" + await isEqual)
        return await isEqual
    };

    this.waitForEqual = async function () {
        browser.wait(this.isEqual, 10000, 'order is not visible')
    };

};

module.exports = new checkoutPage();