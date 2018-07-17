let homePage = require('../pages/homePage.js');
let orderPage = require('../pages/orderPage.js');
let helper = require('../helper/helper.js');
let dateFormat = require('dateformat');
let checkoutPage = function () {

    const NEGATIVE_COLOR = 'rgb(233, 50, 45)';
    let inputCardTypeField = element(by.xpath("//select[@name = 'ccType']"));
    let cardNumberField = element(by.xpath("//input[@name = 'ccNum']"));
    let expireDateField = element(by.xpath("//input[@name = 'ccExp']"));
    let cvcField = element(by.xpath("//input[@name = 'ccCvc']"));
    let purchaseButton = element(by.xpath("//ng-view/form/div/div[2]/div/button[@ng-click = 'purchase()']"));

    const MIN_CARD_EXPIRATION_DATE = new Date();
    const MAX_CARD_EXPIRATION_DATE = new Date(2025, 0, 1);

    this.reload = async function () {
        browser.wait(EC.visibilityOf(inputCardTypeField), 10000);
        await browser.refresh()
    };

    this.generateValidCardNumber = async function () {
        return helper.getRandomNumeric(16)
    };

    this.setCardNumber = async function (cardNumberValue) {
        browser.wait(EC.visibilityOf(cardNumberField), 10000);
        await cardNumberField.sendKeys(cardNumberValue);
        expireDateField.click();
    };

    this.generateValidExpireDate = () => {
        let expireDate = new Date(MIN_CARD_EXPIRATION_DATE.getTime() +
            Math.random() * (MAX_CARD_EXPIRATION_DATE.getTime() - MIN_CARD_EXPIRATION_DATE.getTime()));
        return dateFormat(expireDate, "mm/yyyy");
    };

    this.setExpireDate = async function (expireDate) {
        browser.wait(EC.visibilityOf(expireDateField), 10000);
        await expireDateField.sendKeys(expireDate);
        cvcField.click();
    };

    this.generateValidCvc = function () {
        return helper.getRandomNumeric(3);
    };

    this.setCvc = async function (cvcValue) {
        browser.wait(EC.visibilityOf(cvcField), 10000);
        await cvcField.sendKeys(cvcValue);
        expireDateField.click();
    };

    this.selectCardType = async function (cardType) {
        browser.wait(EC.visibilityOf(inputCardTypeField), 10000);
        await inputCardTypeField.$(`[value="${cardType}"]`).click()
    };

    this.isPurchaseButtonEnabled = async function () {
        return purchaseButton.isEnabled()
    };

    this.isCardNumberHighlightedInNegativeColor = async function () {
        return await (await cardNumberField.getCssValue('border-color') === NEGATIVE_COLOR);
    };

    this.isExpireDateHighlightedInNegativeColor = async function () {
        return await (await expireDateField.getCssValue('border-color') === NEGATIVE_COLOR);
    };

    this.isCvcHighlightedInNegativeColor = async function () {
        return await (await cvcField.getCssValue('border-color') === NEGATIVE_COLOR);
    };

    this.purchaseButtonClick = async function () {
        await purchaseButton.click()
    };
};

module.exports = new checkoutPage();