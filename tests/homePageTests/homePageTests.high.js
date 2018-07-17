let ratingData = require('../../testing-data/ratingData.module.js');
let homePage = require('../../pages/homePage.js');
let helper = require('../../helper/helper.js');
let using = require('jasmine-data-provider');

describe('Home Page: ', function () {
    let originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    beforeAll(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        homePage.open()
    });
    afterEach(function () {
        homePage.reload()
    });

    afterAll(async function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    });

    describe('Filter by rating: ', function () {
        using(ratingData.ratings, function (data, description) {
            it('Rating: ' + description + ' stars', async function () {
                logger.info(`WHEN User sets the rating ${data.rating} star`);
                homePage.setRating(data.rating);

                logger.info("THEN The number of found results is correct");
                homePage.waitForSpecificNumberOfResultsLoading(data.numberOfRestaurant);
                let numberOfRestaurants = homePage.getNumberOfRestaurants();
                expect(numberOfRestaurants).toBe(data.numberOfRestaurant);

                for (let i = 0; i < numberOfRestaurants; i++) {
                    logger.info(`AND The number of stars is equal to the set up rating`);
                    expect(homePage.getRatingValueForRestaurantInList(i)).toBe(data.rating, "Count of selected restaurants is incorrect")
                }
            })
        });
    });
    describe('Filter by price: ', function () {
        using(ratingData.prices, function (data, description) {
            it('Price: ' + description + ' stars', async function () {

                logger.info(`WHEN User sets the price ${data.price} star`);
                homePage.setPrice(data.price);

                logger.info("THEN The number of found results is correct");
                homePage.waitForSpecificNumberOfResultsLoading(data.numberOfRestaurant);
                let numberOfRestaurants = homePage.getNumberOfRestaurants();
                expect(numberOfRestaurants).toBe(data.numberOfRestaurant);

                for (let i = 0; i < numberOfRestaurants; i++) {
                    logger.info(`AND The number of stars is equal to the set up price`);
                    expect(homePage.getPriceValueForRestaurantInList(i)).toBe(data.price, "Count of selected restaurants is incorrect")
                }
            })
        });
    });
    describe('Filter by combined parameter: ', function () {
        it('Rating + price combination', async function () {
            let indexOfDataSet = helper.getRandomInt(0, ratingData.combinations.length);
            logger.info(`WHEN User sets the rating ${ratingData.combinations[indexOfDataSet].rating} star`);

            homePage.setRating(ratingData.combinations[indexOfDataSet].rating);

            logger.info(`AND User sets the price ${(ratingData.combinations[indexOfDataSet].price)} star`);
            homePage.setPrice((ratingData.combinations[indexOfDataSet].price));

            logger.info("THEN The number of found results is correct");
            expect(homePage.getNumberOfRestaurants()).toBe(ratingData.combinations[indexOfDataSet].numberOfRestaurant)

        });
        it('Price + rating combination', async function () {
            let indexOfDataSet = helper.getRandomInt(0, ratingData.combinations.length);
            logger.info(`WHEN User sets the price ${(ratingData.combinations[indexOfDataSet].price)} star`);
            homePage.setPrice((ratingData.combinations[indexOfDataSet].price));

            logger.info(` AND User sets the rating ${ratingData.combinations[indexOfDataSet].rating} star`);
            homePage.setRating(ratingData.combinations[indexOfDataSet].rating);

            logger.info("THEN The number of found results is correct");
            let numberOfRestaurants = homePage.getNumberOfRestaurants();
            expect(numberOfRestaurants).toBe(ratingData.combinations[indexOfDataSet].numberOfRestaurant)

        });
    });
    describe('Filter by cuisine: ', function () {
        it('random set of cuisines', async function () {
            logger.info(`WHEN User sets the cuisine`);
            let indexOfDataSet = helper.getRandomInt(0, ratingData.cuisine.length);
            homePage.setCuisine(ratingData.cuisine[indexOfDataSet].type);

            logger.info("THEN The set of found restaurants is correct");
            expect((homePage.getListOfRestaurantNames()).getText()).toEqual(ratingData.cuisine[indexOfDataSet].restaurants, "Count of selected restaurants is incorrect");
        })
    })
});