xdescribe('Rating Filter test', function () {

    let fs = require('fs')

    var log4js = require('log4js')
    var logger = log4js.getLogger()
    let controlMessage = element(by.xpath('//div[contains(@class,"fm-restaurant-list")]//ng-pluralize'))
    let clearButton = element(by.xpath('//form/fm-rating[2]/a[@ng-click = "select(null)"]'))
    logger.level = 'info'

    let homePage = require('../pages/homePage.js')
    let EC = protractor.ExpectedConditions

    beforeAll(function () {
        homePage.openHomePage()
    })

    //using(ratingData.ratings, function (data, description) {
    xit('checking of the clear rating  button: stars', async function () {

       /* browser.wait(EC.visibilityOf(controlMessage), 10000)
        logger.info(`WHEN User waiting for all restaurants`)
        browser.wait(EC.visibilityOf(controlMessage), 10000)*/

        /*logger.info(`AND number of all restaurants was calculated`)
        browser.wait(EC.visibilityOf(element(by.xpath('//fm-rating[1]'))), 10000)*/

        let numberOfRetaurantsBeforeFiltering = homePage.getNumberOfRestaurants()

        logger.info("WHEN User sets the rating")
        homePage.setPrice(1)
        browser.wait(EC.visibilityOf(controlMessage), 10000, "")

        logger.info(`AND clicks the Clear button`)
        clearButton.click()

        logger.info(`THEN actual number of all restaurants`)
        expect(homePage.getNumberOfRestaurants()).toEqual(numberOfRetaurantsBeforeFiltering, "")

    })


})

