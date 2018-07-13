let homePage = require('../pages/homePage.js');
let orderPage = require('../pages/orderPage.js');
let checkoutPage = require('../pages/checkoutPage.js');
let using = require('jasmine-data-provider');
let ratingData = require('../testing-data/ratingData.module.js');
let checkoutData = require('../testing-data/checkoutData.module.js');
let helper = require('../helper/helper.js');

describe('Checkout Page:', function () {

    beforeAll(async function () {
        logger.info("TEST PREPARATION");

        let randomRestaurantIndex = helper.getRandomInt(0, ratingData.totalNumberOfResults)
        orderPage.openOrderForRestaurantByIndex(randomRestaurantIndex);

        await orderPage.createOrder()

        await orderPage.checkoutOrder();
        await logger.info("PREPARATION COMPLETED");
    });

    afterEach(async function () {
        await browser.refresh()
    });

    describe('Positive: User may pay the order with credit card: ', function () {
        using(checkoutData.cardTypes, function (data, description) {
            it(description, function () {

                logger.info("CARD TYPE: " + data.type)

                logger.info(`WHEN user selects the type ${description} `)
                checkoutPage.selectCardType(data.type)

                logger.info(`AND  set the valid card number`)
                checkoutPage.setCardNumber(checkoutPage.generateValidCardNumber())

                logger.info(`AND  set the valid expire date`)
                checkoutPage.setExpireDate( checkoutPage.generateValidExpireDate())

                logger.info(`AND  set the valid CVC `)
                checkoutPage.setCvc(checkoutPage.generateValidCvc())

                //browser.driver.sleep(2000)
                logger.info(`THEN purchase button is enabled `)
                //browser.wait(EC.visibilityOf(inputCardTypeField), 10000)
                expect(checkoutPage.isPurchaseButtonEnabled()).toBe(true)
            });
        });
    });

    xdescribe('Negative: ', function () {
        describe('Negative: Payment button is disabled:', function () {
            describe('All data is filled in but one field contains invalid value: ', function () {
                it('Card Number contains invalid value', async function () {
                    logger.info(`WHEN user select the card type  `)
                    await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.size, 0)].type)

                    logger.info(`AND  set the invalid card number`)
                    await checkoutPage.setCardNumber(checkoutData.invalidCardNumbers[helper.getRandomInt(checkoutData.invalidCardNumbers.size), 0].symbolSet)

                    logger.info(`AND  set the valid expire date`)
                    checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                    logger.info(`AND  set the valid CVC `)
                    checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                    //browser.driver.sleep(2000)
                    logger.info(`THEN purchase button is enabled `)
                    expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false)
                })
                it('Expire Date contains invalid value', async function () {
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
                     expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false)*/
                })
                it('CVC contains invalid value', async function () {
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
                     expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false)*/
                })
            })
            xdescribe('Required field is empty: ', function () {
                it('Card Number is empty', async function () {
                    logger.info(`WHEN user select the type ${description} `)
                    await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length)].type)

                    logger.info(`AND  does not set the card number`)
                    logger.info(`AND  set the valid expire date`)
                    checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                    logger.info(`AND  set the valid CVC `)
                    checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                    logger.info(`THEN purchase button is enabled `)
                    expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false)
                })
                it('Expire Date is empty', async function () {
                     logger.info(`WHEN user select the type ${description} `)
                     await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length)].type)

                     logger.info(`AND  set the invalid card number`)
                     await checkoutPage.setCardNumber('65406504')

                     logger.info(`AND  does not set the expire date`)
                     logger.info(`AND  set the valid CVC `)
                     checkoutPage.setCvc(await checkoutPage.generateValidCvc())

                     logger.info(`THEN purchase button is enabled `)
                     expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false)
                })
                it('CVC is empty', async function () {
                     logger.info(`WHEN user select the type ${description} `)
                     await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.size)].type)

                     logger.info(`AND  set the invalid card number`)
                     await checkoutPage.setCardNumber('65406504')

                     logger.info(`AND  set the valid expire date`)
                     checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate())

                     logger.info(`AND  does not set the CVC `)
                     logger.info(`THEN purchase button is enabled `)
                     expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false)
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

