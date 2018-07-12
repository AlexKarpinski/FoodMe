let ratingData = require('../testing-data/ratingData.module.js')
let homePage = require('../pages/homePage.js')

let using = require('jasmine-data-provider')
let fs = require('fs')

describe('Filtering: ', function () {

    let EC = protractor.ExpectedConditions

    beforeAll(function () {
        homePage.openHomePage()
    })

    afterEach(function () {
        homePage.reload()
    })
    xdescribe('Filtering by rating: ', function () {
        using(ratingData.ratings, function (data, description) {
            xit('Rating: ' + description + ' stars', async function () {

                logger.info(`WHEN User sets the rating ${data.rating} star`)
                homePage.setRating(data.rating)

                logger.info("THEN The number of found results is correct")
                homePage.waitForSpecificNumberOfResultsLoading(data.numberOfRestaurant)
                let numberOfRestaurants = homePage.getNumberOfRestaurants()
                expect(numberOfRestaurants).toBe(data.numberOfRestaurant)

                for (let i = 0; i < numberOfRestaurants; i++) {
                    logger.info(`AND The number of stars is equal to the set up rating`)
                    expect(homePage.getRatingValue(i)).toBe(data.rating)
                }
            })
        })

        xit('Clear the rating', async function () {

            // homePage.waitForResultsLoading()
            // let numberOfRetaurantsBeforeFiltering =  homePage.getNumberOfRestaurants()

            logger.info("WHEN User sets the rating")
            homePage.setRating(Math.floor((Math.random() * 5) + 1))

            logger.info(`AND clicks the Clear button`)
            homePage.clearRating()

            logger.info(`THEN actual number of all restaurants`)
            expect(homePage.getNumberOfRestaurants()).toEqual(ratingData.totalNumberOfResults, "")

        })
    })
    xdescribe('Filtering by price: ', function () {
        using(ratingData.prices, function (data, description) {
            xit('Price: ' + description + ' stars', async function () {

                logger.info(`WHEN User sets the price ${data.price} star`)
                homePage.setPrice(data.price)

                logger.info("THEN The number of found results is correct")
                homePage.waitForSpecificNumberOfResultsLoading(data.numberOfRestaurant)
                let numberOfRestaurants = homePage.getNumberOfRestaurants()
                expect(numberOfRestaurants).toBe(data.numberOfRestaurant)

                for (let i = 0; i < numberOfRestaurants; i++) {
                    logger.info(`AND The number of stars is equal to the set up price`)
                    expect(homePage.getPriceValue(i)).toBe(data.price)
                }
            })
        })

        xit('Clear the price', async function () {

            //homePage.waitForResultsLoading()
            //let numberOfRetaurantsBeforeFiltering =  homePage.getNumberOfRestaurants()

            logger.info("WHEN User sets the rating")
            homePage.setPrice(Math.floor((Math.random() * 5) + 1))

            logger.info(`AND clicks the Clear button`)
            homePage.clearPrice()

            logger.info(`THEN actual number of all restaurants`)
            expect(homePage.getNumberOfRestaurants()).toEqual(ratingData.totalNumberOfResults, "")

        })
    })

    xdescribe('Filtering by combined parameter: ', function () {

        xit('Rating + price combination', async function () {

            let indexOfDataSet = Math.floor((Math.random() * ratingData.combinations.length))
            logger.info(`WHEN User sets the rating ${ratingData.combinations[indexOfDataSet].rating} star`)

            homePage.setRating(ratingData.combinations[indexOfDataSet].rating)

            logger.info(`AND User sets the price ${(ratingData.combinations[indexOfDataSet].price)} star`)
            homePage.setPrice((ratingData.combinations[indexOfDataSet].price))

            logger.info("THEN The number of found results is correct")
            expect(homePage.getNumberOfRestaurants()).toBe(ratingData.combinations[indexOfDataSet].numberOfRestaurant)

        })
        xit('Price + rating combination', async function () {
            let indexOfDataSet = Math.floor((Math.random() * ratingData.combinations.length))
            logger.info(`WHEN User sets the price ${(ratingData.combinations[indexOfDataSet].price)} star`)
            homePage.setPrice((ratingData.combinations[indexOfDataSet].price))

            logger.info(` AND User sets the rating ${ratingData.combinations[indexOfDataSet].rating} star`)
            homePage.setRating(ratingData.combinations[indexOfDataSet].rating)

            logger.info("THEN The number of found results is correct")
            let numberOfRestaurants = homePage.getNumberOfRestaurants()
            expect(numberOfRestaurants).toBe(ratingData.combinations[indexOfDataSet].numberOfRestaurant)

        })

        xit('Rating + price clearing', async function () {

            let indexOfDataSet = Math.floor((Math.random() * ratingData.combinations.length))

            logger.info(`WHEN User sets the rating ${ratingData.combinations[indexOfDataSet].rating} star`)
            homePage.setRating(ratingData.combinations[indexOfDataSet].rating)

            logger.info(`AND User sets the price ${ratingData.combinations[indexOfDataSet].price} star`)
            homePage.setPrice(ratingData.combinations[indexOfDataSet].price)

            logger.info(`AND clicks the Clear buttons`)
            homePage.clearPrice()
            homePage.moveMouseToFilter()
            homePage.clearRating()

            logger.info(`THEN actual number of all restaurants is correct`)
            expect(homePage.getNumberOfRestaurants()).toEqual(ratingData.totalNumberOfResults, "")
        })

    })


    describe('Filtering by cuisine: ', function () {
        it('Filtering by cuisine', async function () {

            logger.info(`WHEN User sets the cuisine`)
            let indexOfDataSet = Math.floor((Math.random() * ratingData.cuisine.length))
            homePage.setCuisine(ratingData.cuisine[indexOfDataSet].type)

            logger.info("THEN The set of found restaurants is correct")
            let list = homePage.getListOfRestaurants()
            expect(list.getText()).toEqual(ratingData.cuisine[indexOfDataSet].restaurants);

        })
    })
})