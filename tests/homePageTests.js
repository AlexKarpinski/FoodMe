var ratingData = require('../testing-data/ratingData.module.js');
var using = require('jasmine-data-provider');

describe('Rating Filter test', function () {

    let fs = require('fs')

    let log4js = require('log4js')
    let logger = log4js.getLogger()
    logger.level = 'info'

    let homePage = require('../pages/homePage.js')
    let EC = protractor.ExpectedConditions

    beforeAll(function () {

        homePage.openHomePage()
    })
    afterEach(function () {

        homePage.reload()

    })


    using(ratingData.ratings, function (data, description) {
        xit('checking of the rating filter: ' + description + ' stars', async function () {

            logger.info(`WHEN User sets the rating ${data.rating} star`)
            homePage.setRating(data.rating)

            logger.info("THEN The number of found results is correct")
            let numberOfRestaurants = homePage.getNumberOfRestaurants()
            expect(numberOfRestaurants).toBe(data.numberOfRestaurant)

            for (let i = 0; i < numberOfRestaurants; i++) {
                logger.info(`AND The number of stars is equal to the set up rating`)
                expect(homePage.getRatingValue(i)).toBe(data.rating)
            }
        })
    })


    using(ratingData.prices, function (data, description) {
        it('Filter by price: ' + description + ' stars', async function () {

            logger.info(`WHEN User sets the price ${data.price} star`)
            homePage.setPrice(data.price)

            logger.info("THEN The number of found results is correct")
            let numberOfRestaurants = homePage.getNumberOfRestaurants()
            expect(numberOfRestaurants).toBe(data.numberOfRestaurant)

            for (let i = 0; i < numberOfRestaurants; i++) {
                logger.info(`AND The number of stars is equal to the set up price`)
                expect(homePage.getPriceValue(i)).toBe(data.price)
            }


        })
    })


})