let homePage = require('../pages/homePage.js')
let orderPage = require('../pages/orderPage.js')
let ratingData = require('../testing-data/ratingData.module.js')

xdescribe('Creating of the random order on the orderPage: ', function () {

    beforeAll(function () {
        logger.info("TEST PREPARATION")
        let randomRestaurantIndex = Math.floor((Math.random() * ratingData.totalNumberOfResults))
        orderPage.openOrderForRestaurantByIndex(randomRestaurantIndex)
        logger.info("PREPARATION COMPLETED")
    })
    afterEach(function () {
        orderPage.reload()
    })

})
