let homePage = require('../pages/homePage.js')
let orderPage = require('../pages/orderPage.js')
let checkoutPage = require('../pages/checkoutPage.js')
let using = require('jasmine-data-provider')
let ratingData = require('../testing-data/ratingData.module.js')
let checkoutData = require('../testing-data/checkoutData.module.js')
let helper = require('../testing-data/Helper.js')

describe('Checkout Page:', function () {

    beforeAll(async function () {
        logger.info("TEST PREPARATION")
        let randomRestaurantIndex = Math.floor((Math.random() * ratingData.totalNumberOfResults))
        orderPage.openOrderForRestaurantByIndex(randomRestaurantIndex)
        await  orderPage.addRandomDishesToOrder()
        //browser.driver.sleep(3000)
        await checkoutPage.clickOnTheCheckoutButton()
        logger.info("PREPARATION COMPLETED")

    })
    afterEach(async function () {
        await  checkoutPage.reload()
    })

    describe('Positive: User may pay the order with credit card: ', function () {
        using(checkoutData.cardTypes, function (data, description) {
           it(description, async function () {
                logger.info(`WHEN user selects the type ${description} `)
                await  checkoutPage.selectCardType(data.type)

                logger.info(`AND  set the valid card number`)
                checkoutPage.setCardNumber(await checkoutPage.generateValidCardNumber())

                logger.info(`AND  set the valid expire date`)
                checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                logger.info(`AND  set the valid CVC `)
                checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                //browser.driver.sleep(2000)
                logger.info(`THEN purchase button is enabled `)
                expect(await checkoutPage.purchaseButtonIsEnabled()).toBe(true)
            })
        })
    })

    // Modify order and verify total sum is changed

    xdescribe('Negative: ', function () {
        describe('Negative: Payment button is disabled:', function () {
            describe('All data is filled in but one field contains invalid value: ', function () {
                it('Card Number contains invalid value', async function () {
                    logger.info(`WHEN user select the card type  `)
                    await  checkoutPage.selectCardType("mc")
                    checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length, 0)].type

                    logger.info(`AND  set the invalid card number`)
                    await checkoutPage.setCardNumber(checkoutData.invalidCardNumbers[helper.getRandomInt(checkoutData.invalidCardNumbers.length)].symbolSet)

                    logger.info(`AND  set the valid expire date`)
                    checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                    logger.info(`AND  set the valid CVC `)
                    checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                    //browser.driver.sleep(2000)
                    logger.info(`THEN purchase button is enabled `)
                    expect(checkoutPage.purchaseButtonIsEnabled()).toBe(false)
                })
                xit('Expire Date contains invalid value', async function () {
                    /* logger.info(`WHEN user select the type ${description} `)
                     await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length)].type)

                     logger.info(`AND  set the invalid card number`)
                     await checkoutPage.setCardNumber('65406504')

                     logger.info(`AND  set the valid expire date`)
                     checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                     logger.info(`AND  set the valid CVC `)
                     checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                     //browser.driver.sleep(2000)
                     logger.info(`THEN purchase button is enabled `)
                     expect(checkoutPage.purchaseButtonIsEnabled()).toBe(false)*/
                })
                xit('CVC contains invalid value', async function () {
                    /* logger.info(`WHEN user select the type ${description} `)
                     await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length)].type)

                     logger.info(`AND  set the invalid card number`)
                     await checkoutPage.setCardNumber('65406504')

                     logger.info(`AND  set the valid expire date`)
                     checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                     logger.info(`AND  set the valid CVC `)
                     checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                     //browser.driver.sleep(2000)
                     logger.info(`THEN purchase button is enabled `)
                     expect(checkoutPage.purchaseButtonIsEnabled()).toBe(false)*/
                })
            })
            xdescribe('Required field is empty: ', function () {
                xit('Card Number is empty', async function () {
                    logger.info(`WHEN user select the type ${description} `)
                    await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length)].type)

                    logger.info(`AND  set the invalid card number`)
                    await checkoutPage.setCardNumber('65406504')

                    logger.info(`AND  set the valid expire date`)
                    checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                    logger.info(`AND  set the valid CVC `)
                    checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                    //browser.driver.sleep(2000)
                    logger.info(`THEN purchase button is enabled `)
                    expect(checkoutPage.purchaseButtonIsEnabled()).toBe(false)
                })
                xit('Expire Date is empty', async function () {
                    /* logger.info(`WHEN user select the type ${description} `)
                     await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length)].type)

                     logger.info(`AND  set the invalid card number`)
                     await checkoutPage.setCardNumber('65406504')

                     logger.info(`AND  set the valid expire date`)
                     checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                     logger.info(`AND  set the valid CVC `)
                     checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                     //browser.driver.sleep(2000)
                     logger.info(`THEN purchase button is enabled `)
                     expect(checkoutPage.purchaseButtonIsEnabled()).toBe(false)*/
                })
                xit('CVC is empty', async function () {
                    /* logger.info(`WHEN user select the type ${description} `)
                     await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length)].type)

                     logger.info(`AND  set the invalid card number`)
                     await checkoutPage.setCardNumber('65406504')

                     logger.info(`AND  set the valid expire date`)
                     checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                     logger.info(`AND  set the valid CVC `)
                     checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                     //browser.driver.sleep(2000)
                     logger.info(`THEN purchase button is enabled `)
                     expect(checkoutPage.purchaseButtonIsEnabled()).toBe(false)*/
                })
            })
        })
        xdescribe('Card Number is highlighted in negative color is invalid value was entered', function () {
            using(checkoutData.invalidCardNumbers, function (card, description) {
                it('Card Number is highlighted in negative color is invalid value was entered', async function () {
                    logger.info(`WHEN user select the type ${description} `)

                    logger.info(`AND  set the invalid card number`)
                    await checkoutPage.setCardNumber(card.symbolSet)

                    logger.info(`THEN purchase button is enabled `)
                    expect(checkoutPage.getFieldBorderColor()).toBe('#E9322D')

                })
            })
        })

        // fields are not filled

    })
})

