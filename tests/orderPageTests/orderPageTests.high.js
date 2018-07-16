let orderPage = require('../../pages/orderPage.js');
let ratingData = require('../../testing-data/ratingData.module.js');
let helper = require('../../helper/helper.js');

describe('Order Page: ', function () {

    beforeAll(function () {
        logger.info("TEST PREPARATION");
        let randomRestaurantIndex = helper.getRandomInt(0, ratingData.totalNumberOfResults);
        orderPage.openOrderForRestaurantByIndex(randomRestaurantIndex);
        logger.info("PREPARATION COMPLETED")
    });
    afterEach(function () {
        orderPage.reload()
    });

    it('Create order with random dishes and click checkout', async function () {
        logger.info("WHEN User user adds dishes into the order");
        let dishesData = orderPage.generateDishesData();
        await orderPage.addRandomDishesToOrder(await dishesData);
        let expectedTotalSum = await orderPage.calculateOrderSum(await dishesData);
        logger.info("THEN total sum is correct: " + await expectedTotalSum);
        expect(orderPage.isTotalSumCorrect(await expectedTotalSum)).toBe(true, "Total sum is wrong")
    })
});