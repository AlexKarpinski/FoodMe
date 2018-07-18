let ratingData = require("../../testing-data/ratingData.module.js");
let homePage = require("../../pages/homePage.js");
let helper = require("../../helper/helper.js");
let using = require("jasmine-data-provider");

describe("Home Page: ", function () {

    beforeAll(function () {
        homePage.open()
    });
    afterEach(function () {
        homePage.reload()
    });

    describe("Filter by rating: ", function () {
        it("Clear the rating", async function () {

            logger.info("WHEN User sets the rating");
            homePage.setRating(helper.getRandomInt(1, 5));

            logger.info(`AND clicks the Clear button`);
            homePage.clearRating();

            logger.info(`THEN actual number of all restaurants`);
            expect(homePage.getNumberOfRestaurants()).toEqual(ratingData.totalNumberOfResults,
                "Count of restaurants after the rating clearing is incorrect")
        })
    });
    describe("Filter by price: ", function () {
        it("Clear the price", async function () {

            logger.info("WHEN User sets the rating");
            homePage.setPrice(helper.getRandomInt(1, 5));

            logger.info(`AND clicks the Clear button`);
            homePage.clearPrice();

            logger.info(`THEN actual number of all restaurants`);
            expect(homePage.getNumberOfRestaurants()).toEqual(ratingData.totalNumberOfResults,
                "Count of restaurants after the price clearing is incorrect")
        })
    });
    describe("Filter by combined parameter: ", function () {
        it("Rating + price clearing", async function () {

            let indexOfDataSet = helper.getRandomInt(0, ratingData.combinations.length);

            logger.info(`WHEN User sets the rating ${ratingData.combinations[indexOfDataSet].rating} star`);
            homePage.setRating(ratingData.combinations[indexOfDataSet].rating);

            logger.info(`AND User sets the price ${ratingData.combinations[indexOfDataSet].price} star`);
            homePage.setPrice(ratingData.combinations[indexOfDataSet].price);

            logger.info(`AND clicks the Clear buttons`);
            homePage.clearPrice();
            homePage.moveMouseToFilter();
            homePage.clearRating();

            logger.info(`THEN actual number of all restaurants is correct`);
            expect(homePage.getNumberOfRestaurants()).toEqual(ratingData.totalNumberOfResults,
                "Count of restaurants after the price and rating clearing is incorrect")
        })
    });
});