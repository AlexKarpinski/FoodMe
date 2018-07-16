let homePage = require('../pages/homePage.js');
let orderPage = require('../pages/orderPage.js');
let checkoutPage = require('../pages/checkoutPage.js');
let confirmPage = require('../pages/confirmPage.js');
let using = require('jasmine-data-provider');
let ratingData = require('../testing-data/ratingData.module.js');
let checkoutData = require('../testing-data/checkoutData.module.js');
let helper = require('../helper/helper.js');


describe('Checkout Page:', function () {

    const NEGATIVE_COLOR = 'rgb(233, 50, 45)';
    beforeAll(async function () {
        logger.info("TEST PREPARATION");
        let randomRestaurantIndex = helper.getRandomInt(0, ratingData.totalNumberOfResults);
        orderPage.openOrderForRestaurantByIndex(randomRestaurantIndex);

        await orderPage.createOrder();
        await orderPage.checkoutOrder();
        await logger.info("PREPARATION COMPLETED");
    });

    afterEach(async function () {
        checkoutPage.reload()
    });

    xdescribe('Positive: User may pay the order with credit card: ', function () {
        using(checkoutData.cardTypes, function (data, description) {
            it("Type", async function () {
                await orderPage.createOrder();
                await orderPage.checkoutOrder();

                logger.info("CARD TYPE: " + data.type);

                logger.info(`WHEN user selects the type ${data.description} `);
                checkoutPage.selectCardType(data.type);

                logger.info(`AND  set the valid card number`);
                checkoutPage.setCardNumber(checkoutPage.generateValidCardNumber());

                logger.info(`AND  set the valid expire date`);
                checkoutPage.setExpireDate(checkoutPage.generateValidExpireDate());

                logger.info(`AND  set the valid CVC `);
                checkoutPage.setCvc(checkoutPage.generateValidCvc());

                logger.info(`THEN purchase button is enabled `);
                expect(checkoutPage.isPurchaseButtonEnabled()).toBe(true, "Purchase button is disabled")

                checkoutPage.clickPurchaseButton()
                expect(confirmPage.getFinalMessage()).toBe("Thank you for your order!", "Purchase button is disabled")
                let randomRestaurantIndex = helper.getRandomInt(0, ratingData.totalNumberOfResults);
                orderPage.openOrderForRestaurantByIndex(randomRestaurantIndex);

            });
        });
    });

    describe('Negative: ', function () {
        xdescribe('Negative: Payment button is disabled:', function () {
            describe('All data is filled in but one field contains invalid value: ', function () {
                it('Card Number contains invalid value', async function () {
                    logger.info(`WHEN user select the card type  `);
                    await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(0, await checkoutData.cardTypes.length)].type);

                    logger.info(`AND  set the invalid card number`);
                    await checkoutPage.setCardNumber(checkoutData.invalidCardNumbers[helper.getRandomInt(0, checkoutData.invalidCardNumbers.length)].symbolSet);

                    logger.info(`AND  set the valid expire date`);
                    checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate());

                    logger.info(`AND  set the valid CVC `);
                    checkoutPage.setCvc(await checkoutPage.generateValidCvc());

                    logger.info(`THEN purchase button is disabled `);
                    expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false, "Purchase button is enabled")
                });
                xit('Expire Date contains invalid value', async function () {
                    logger.info(`WHEN user select the type `);
                    await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length)].type);

                    logger.info(`AND  set the valid card number`);
                    checkoutPage.setCardNumber(checkoutPage.generateValidCardNumber());

                    logger.info(`AND  set the invalid expire date`);
                    checkoutPage.setExpireDate(checkoutData.invalidExpireDate[helper.getRandomInt(0, checkoutData.invalidExpireDate.length)].symbolSet);

                    logger.info(`AND  set the valid CVC `);
                    checkoutPage.setCvc(await checkoutPage.generateValidCvc());

                    logger.info(`THEN purchase button is enabled `);
                    expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false, "Purchase button is enabled")
                });
                xit('CVC contains invalid value', async function () {
                    logger.info(`WHEN user select the type ${description} `);
                    await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(checkoutData.cardTypes.length)].type);

                    logger.info(`AND  set the valid card number`);
                    checkoutPage.setCardNumber(checkoutPage.generateValidCardNumber());

                    logger.info(`AND  set the valid expire date`);
                    checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate());

                    logger.info(`AND  set the invalid CVC `);
                    checkoutPage.setCvc(checkoutData.invalidCvc[helper.getRandomInt(0, checkoutData.invalidCvc.length)].symbolSet);

                    logger.info(`THEN purchase button is enabled `);
                    expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false)
                })
            });
            xdescribe('Required field is empty: ', function () {
                it('Card Number is empty', async function () {
                    logger.info(`WHEN user select the type `);
                    await  checkoutPage.selectCardType(checkoutData.cardTypes[0, helper.getRandomInt(checkoutData.cardTypes.count)].type);

                    logger.info(`AND  does not set the card number`);
                    logger.info(`AND  set the valid expire date`);
                    checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate());

                    logger.info(`AND  set the valid CVC `);
                    checkoutPage.setCvc(await checkoutPage.generateValidCvc());

                    logger.info(`THEN purchase button is enabled `);
                    expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false, "Purchase button is enabled")
                });
                it('Expire Date is empty', async function () {
                    logger.info(`WHEN user select the type `);
                    await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(0, checkoutData.cardTypes.count)].type);

                    logger.info(`AND  set the valid card number`);
                    await checkoutPage.setCardNumber(await checkoutPage.generateValidCardNumber());

                    logger.info(`AND  does not set the expire date`);
                    logger.info(`AND  set the valid CVC `);
                    checkoutPage.setCvc(await checkoutPage.generateValidCvc());

                    logger.info(`THEN purchase button is enabled `);
                    expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false, "Purchase button is enabled")
                });
                it('CVC is empty', async function () {
                    logger.info(`WHEN user select the type `);
                    await  checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(0, checkoutData.cardTypes.count)].type);

                    logger.info(`AND  set the invalid card number`);
                    await checkoutPage.setCardNumber(await checkoutPage.generateValidCardNumber());

                    logger.info(`AND  set the valid expire date`);
                    checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate());

                    logger.info(`AND  does not set the CVC `);
                    logger.info(`THEN purchase button is enabled `);
                    expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false, "Purchase button is enabled")
                })
            })
            describe('All fields are not filled', function () {
                it('All fields are not filled', function () {
                    logger.info(`WHEN user does not select the type of card and does not filled the fields `)
                    logger.info(`THEN purchase button is disabled `);
                    expect(checkoutPage.isPurchaseButtonEnabled()).toBe(false, "Purchase button is enabled")
                })
            })
        });
        describe('Card Number is highlighted in negative color is invalid value was entered', function () {
            using(checkoutData.invalidCardNumbers, function (card, description) {
                it('Card Number is highlighted in negative color is invalid value was entered', async function () {
                    logger.info(`WHEN user select the type `);

                    logger.info(`AND  set the ${await card.description}`);
                    await checkoutPage.selectCardType(checkoutData.cardTypes[helper.getRandomInt(0, checkoutData.cardTypes.length)].type);
                    await checkoutPage.setCardNumber(await card.symbolSet);

                    checkoutPage.setExpireDate(await checkoutPage.generateValidExpireDate());
                    browser.wait(checkoutPage.waitForEqual(), 10000, 'order is not visible');
                    expect(await checkoutPage.getCardNumberInputBorderColor()).toBe(NEGATIVE_COLOR)

                })
            })
        })
    })
})

