let homePage = require('../../pages/homePage.js');
let orderPage = require('../../pages/orderPage.js');
let checkoutPage = require('../../pages/checkoutPage.js');
let confirmPage = require('../../pages/confirmPage.js');
let using = require('jasmine-data-provider');
let ratingData = require('../../testing-data/ratingData.module.js');
let checkoutData = require('../../testing-data/checkoutData.module.js');
let helper = require('../../helper/helper.js');


describe('Checkout Page:', function () {
    let originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    beforeAll(async function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;
        logger.info("TEST PREPARATION");
    });

    afterAll(async function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    });

    describe('Positive: User may pay the order with credit card: ', function () {
        using(checkoutData.cardTypes, function (data, description) {
            it("Type: " + data.description, async function () {

                logger.info("TEST PREPARATION");
                let randomRestaurantIndex = helper.getRandomInt(0, ratingData.totalNumberOfResults);
                orderPage.openOrderForRestaurantByIndex(randomRestaurantIndex);

                await orderPage.createOrder();
                await orderPage.checkoutOrder();
                await logger.info("PREPARATION COMPLETED");

                logger.info("CARD TYPE: " + data.type);

                logger.info(`WHEN user selects the type ${data.description} `);
                await checkoutPage.reload();
                await checkoutPage.selectCardType(data.type);

                logger.info(`AND  set the valid card number`);
                await checkoutPage.setCardNumber(checkoutPage.generateValidCardNumber());

                logger.info(`AND  set the valid expire date`);
                checkoutPage.setExpireDate(checkoutPage.generateValidExpireDate());

                logger.info(`AND  set the valid CVC `);
                checkoutPage.setCvc(checkoutPage.generateValidCvc());

                logger.info(`THEN purchase button is enabled `);
                expect(checkoutPage.isPurchaseButtonEnabled()).toBe(true, "Purchase button is disabled");

                await checkoutPage.purchaseButtonClick();
                expect(confirmPage.getFinalMessage()).toBe("Thank you for your order!", "Purchase button is disabled");

            });
        });
    });
});
