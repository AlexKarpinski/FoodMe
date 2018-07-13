let orderPage = require('../pages/orderPage.js')
let ratingData = require('../testing-data/ratingData.module.js')

describe('Order:: ', function () {

    beforeAll(function () {
        logger.info("TEST PREPARATION")
        let randomRestaurantIndex = Math.floor((Math.random() * ratingData.totalNumberOfResults))
        orderPage.openOrderForRestaurantByIndex(randomRestaurantIndex)
        logger.info("PREPARATION COMPLETED")
    })
    afterEach(function () {
        orderPage.reload()
    })

    describe('Testing of the order list: ', function () {

        it('Checking of the ordered dishes list and order total sum: ', async function () {

            logger.info("WHEN User user adds dishes into the order")
            let dishesAddedToOrder = await orderPage.addRandomDishesToOrder()
            let expectedTotalSum = await orderPage.calculateOrderSum(dishesAddedToOrder)

            logger.info("THEN total sum is correct: " + expectedTotalSum)
            expect(await orderPage.getTotalSum()).toBe(expectedTotalSum)
        })
    })
})