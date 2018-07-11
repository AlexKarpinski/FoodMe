let ratingData = require('../testing-data/ratingData.module.js')

let homePage = function () {

    const BASE_URL = 'https://lit-basin-41473.herokuapp.com/#/customer'
    const NAME = 'Joe Black'
    const ADDRESS = '432 Wiggly Rd, Mountain View, 94043'

    let log4js = require('log4js')
    let logger = log4js.getLogger()

    let ratingFilter = element(by.xpath('//fm-rating[@ng-model="$parent.filter.rating"]'))
    let nameInput = element(by.id('customerName'))
    let addressInput = element(by.id('address'))
    let findButton = element(by.buttonText('Find Restaurants!'))
    let EC = protractor.ExpectedConditions
    let controlMessage = element(by.xpath('//div[contains(@class,"fm-restaurant-list")]//ng-pluralize'))
    let clearRatingButton = element(by.xpath('//form/fm-rating[1]/a[@ng-click = "select(null)"]'))
    let clearPriceButton = element(by.xpath('//form/fm-rating[2]/a[@ng-click = "select(null)"]'))

    this.enterName = async function (name) {
        await nameInput.sendKeys(name)

    }

    this.enterAddress = async function (address) {
        await addressInput.sendKeys(address)
    }

    this.setDeliveryData = async function (name, address) {
        this.enterName(name)
        this.enterAddress(address)
        await findButton.click()
    }

    this.openHomePage = function () {
        logger.info(`GIVEN: User goes to ${BASE_URL}`)
        browser.ignoreSynchronization = true
        browser.get(BASE_URL)
        logger.info(`AND: sets delivery data to ${BASE_URL}`)
        browser.wait(EC.visibilityOf(element(by.id('customerName'))), 10000)
        this.setDeliveryData(NAME, ADDRESS)
        this.waitForSpecificNumberOfResultsLoading(ratingData.totelNumberOfResults)
    }

    this.reload = function () {
        browser.refresh()
        this.waitForSpecificNumberOfResultsLoading(ratingData.totelNumberOfResults)
    }

    this.setRating = async function (rating) {
        browser.wait(EC.visibilityOf(ratingFilter), 10000)
        this.getFilterElementByRating('rating', rating).click()
        //await element(by.xpath(`//*[@ng-model="$parent.filter.rating"]//li[${rating}]`)).click()
        // browser.wait(EC.textToBePresentInElement(controlMessage, `${data.numberOfRestaurant} restaurants found`))
        this.waitForResultsLoading()
    }

    this.setPrice = async function (price) {
        browser.wait(EC.visibilityOf(ratingFilter), 10000)
        this.getFilterElementByRating('price', price).click()
        //await element(by.xpath(`//*[@ng-model="$parent.filter.price"]//li[${price}]`)).click()
        this.waitForResultsLoading()
    }

    this.getFilterElementByRating = function (filterName, filterValue) {
        return element(by.xpath(`//*[@ng-model="$parent.filter.${filterName}"]//li[${filterValue}]`))
    }

    /*this.getRating = function () {
        let list = element.all(by.xpath('//tr[@ng-repeat = "restaurant in restaurants"]'))
        return list.count()
    }*/

    this.getNumberOfRestaurants = function () {
        //this.waitForResultsLoading()
        return element.all(by.xpath('//tr[@ng-repeat="restaurant in restaurants"]')).count()
    }

    this.getRatingValue = function (i) {
        let list = element.all(by.xpath(`//table//tr[${i + 2}]//fm-rating[@ng-model="$parent.restaurant.rating"]//*[contains(@class,"fm-selected")]`))
        return list.count()
    }

    this.getPriceValue = function (i) {
        let list = element.all(by.xpath(`//table//tr[${i + 2}]//fm-rating[@ng-model="$parent.restaurant.price"]//*[contains(@class,"fm-selected")]`))
        return list.count()
    }

    this.clearRating = function () {
        this.waitForResultsLoading()
        clearRatingButton.click()
    }

    this.clearPrice = function () {
        this.waitForResultsLoading()
        clearPriceButton.click()
    }

    this.waitForResultsLoading = function () {
        browser.wait(EC.visibilityOf(controlMessage), 10000)
    }

    this.waitForSpecificNumberOfResultsLoading = function (numberOfResults) {
        browser.wait(EC.textToBePresentInElement(controlMessage, `${numberOfResults} restaurants found`))
    }
}

   module.exports = new homePage()