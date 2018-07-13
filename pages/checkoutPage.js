let homePage = require('../pages/homePage.js')
let orderPage = require('../pages/orderPage.js')
let helper = require('../testing-data/Helper.js')
var dateFormat = require('dateformat')
let checkoutPage = function () {

    let checkoutButton = element(by.xpath("//div[@ng-show = 'cart.items.length']"))
    let inputCardTypeField = element(by.xpath("//select[@name = 'ccType']"))
    let cardNumberField = element(by.xpath("//input[@name = 'ccNum']"))
    let expireDateField = element(by.xpath("//input[@name = 'ccExp']"))
    let cvcField = element(by.xpath("//input[@name = 'ccCvc']"))
    let purchaseButton = element(by.xpath("//ng-view/form/div/div[2]/div/button[@ng-click = 'purchase()']"))

    const START_DATE = new Date()
    const END_DATE = new Date (2025, 0, 1)


    this.clickOnTheCheckoutButton = function () {
        // browser.wait(EC.visibilityOf(checkoutButton), 10000)

        checkoutButton.click()
    }
    this.generateValidCardNumber = async function () {
        return helper.getRandomNumeric(16)
    }


    this.setCardNumber = async function (cardNumberValue) {
        cardNumberField.sendKeys(cardNumberValue)
    }
        /*let cardNumberValue
        switch (typeOfSymbolsSet) {
            case 'correctSet':
                cardNumberValue = this.getRandomNumeric(length)
                break;
            case 'incompleteSet':
                cardNumberValue = this.getRandomNumeric(length)
                break;
            case 'incorrectCompleteSet':
                cardNumberValue = this.getRandomSymbol(length)
                break;

        }
        logger.info(cardNumberValue + "This is the value")
        cardNumberField.sendKeys(cardNumberValue)*/



    this.generateValidExpireDate = () => {
        let expireDate = new Date(START_DATE.getTime() + Math.random() * (END_DATE.getTime() - START_DATE.getTime()))
        //let inputExpireDate = (expireDate.getMonth()+ 1) + "/" + expireDate.getFullYear()
        return dateFormat(expireDate, "mm/yyyy");

    }


    this.setExpireDate = async function (expireDate) {
        expireDateField.sendKeys(expireDate)
    }

    this.generateValidCvc = function () {
        return helper.getRandomNumeric(3)
        cvcField.sendKeys(cvcValue)

    }
    this.setCvc = async function (cvcValue) {
        cvcField.sendKeys(cvcValue)
    }
    this.reload = function () {
        browser.refresh()

    }

    this.selectCardType = async function (cardType) {
        browser.wait(EC.visibilityOf(inputCardTypeField), 10000)
        await inputCardTypeField.$(`[value="${cardType}"]`).click()
    }

    this.purchaseButtonIsEnabled = async function () {
        return purchaseButton.isEnabled()

    }

    this.clearingOfInputFields = async function () {
        await inputCardTypeField.clear()
        await expireDateField.clear()
        await cvcField.clear()


    }

    this.getFieldBorderColor = async function () {
        return cardNumberField.getCssValue('border-color')

    }



}


module.exports = new checkoutPage()