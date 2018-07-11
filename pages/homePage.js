let homePage = function () {

    const BASE_URL = 'https://lit-basin-41473.herokuapp.com/#/customer'
    const NAME = 'Joe Black'
    const ADDRESS = '432 Wiggly Rd, Mountain View, 94043'
    var log4js = require('log4js')
    var logger = log4js.getLogger()
    let nameInput = element(by.id('customerName'))
    let addressInput = element(by.id('address'))
    let findButton = element(by.buttonText('Find Restaurants!'))
    let EC = protractor.ExpectedConditions
    let controlMessage = element(by.xpath('//div[contains(@class,"fm-restaurant-list")]//ng-pluralize'))

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
        browser.wait(EC.visibilityOf(controlMessage), 10000)
    }

    this.reload = function () {

        browser.refresh()
        browser.wait(EC.visibilityOf(controlMessage), 10000)
    }


    this.setRating = async function (rating) {
        browser.wait(EC.visibilityOf(element(by.xpath('//fm-rating[1]'))), 10000)
        await element(by.xpath(`//*[@ng-model="$parent.filter.rating"]//li[${rating}]`)).click()
        // browser.wait(EC.textToBePresentInElement(controlMessage, `${data.numberOfRestaurant} restaurants found`))
        logger.info("AND waiting for results loading")
        browser.wait(EC.visibilityOf(controlMessage), 10000)
    }

    this.setPrice = async function (price) {
        browser.wait(EC.visibilityOf(element(by.xpath('//fm-rating[1]'))), 10000)
        await element(by.xpath(`//*[@ng-model="$parent.filter.price"]//li[${price}]`)).click()
        logger.info("AND waiting for results loading")
        browser.wait(EC.visibilityOf(controlMessage), 10000)
    }

    /*this.getRating = function () {
        let list = element.all(by.xpath('//tr[@ng-repeat = "restaurant in restaurants"]'))
        return list.count()
    }*/

    this.getNumberOfRestaurants = function () {
        browser.wait(EC.visibilityOf(controlMessage), 10000)
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

    this.getPriceValue = function (i) {

    }
}

   module.exports = new homePage()