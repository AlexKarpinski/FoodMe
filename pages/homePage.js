let ratingData = require('../testing-data/ratingData.module.js');

let homePage = function () {

    let ratingFilter = element(by.xpath('//fm-rating[@ng-model="$parent.filter.rating"]'));
    let nameInput = element(by.id('customerName'));
    let addressInput = element(by.id('address'));
    let findButton = element(by.buttonText('Find Restaurants!'));
    let controlMessage = element(by.xpath('//div[contains(@class,"fm-restaurant-list")]//ng-pluralize'));
    let clearRatingButton = element(by.xpath('//form/fm-rating[1]/a[@ng-click = "select(null)"]'));
    let clearPriceButton = element(by.xpath('//form/fm-rating[2]/a[@ng-click = "select(null)"]'));
    let listOfRestaurantNames = element.all(by.xpath('//table/tbody/tr/td[1]/a/b'));

    this.enterName = async function (name) {
        await nameInput.sendKeys(name)
    };

    this.enterAddress = async function (address) {
        await addressInput.sendKeys(address)
    };

    this.submitCutomerData = async function (name, address) {
        await this.enterName(name);
        await this.enterAddress(address);
        await findButton.click()
    };

    this.openHomePage = function () {
        logger.info(`GIVEN: User goes to the main page: ${browser.baseUrl}`);
        browser.ignoreSynchronization = true;
        browser.get(browser.baseUrl);
        logger.info(`WHEN: User submit data in the customer form: ${browser.params.name}, ${browser.params.address}`);
        browser.wait(EC.visibilityOf(element(by.id('customerName'))), 10000);
        this.submitCutomerData(browser.params.name, browser.params.address);
        logger.info(`THEN User is redirected to the homePage that contains ${ratingData.totalNumberOfResults}`);
        this.waitForSpecificNumberOfResultsLoading(ratingData.totalNumberOfResults)
    };

    this.reload = function () {
        browser.refresh();
        this.waitForSpecificNumberOfResultsLoading(ratingData.totalNumberOfResults)
    };

    this.setRating = async function (rating) {
        browser.wait(EC.visibilityOf(ratingFilter), 10000);
        this.getFilterElementByRating('rating', rating).click();
        logger.info("WAIT FOR RESULTS LOADING/////");
        this.waitForResultsLoading()
    };

    this.setPrice = async function (price) {
        browser.wait(EC.visibilityOf(ratingFilter), 10000);
        this.getFilterElementByRating('price', price).click();
        this.waitForResultsLoading()
    };

    this.getFilterElementByRating = function (filterName, filterValue) {
        return element(by.xpath(`//*[@ng-model="$parent.filter.${filterName}"]//li[${filterValue}]`))
    };

    this.getNumberOfRestaurants = function () {
        return element.all(by.xpath('//tr[@ng-repeat="restaurant in restaurants"]')).count()
    };

    this.getRatingValueForRestaurantInList = async function (restaurantIndex) {
        return (await this.getRatingElement('rating', restaurantIndex)).count()
    };

    this.getPriceValueForRestaurantInList = async function (restaurantIndex) {
        return (await this.getRatingElement('price', restaurantIndex)).count()
    };

    this.getRatingElement = function (ratingFilterName, restaurantIndex) {
        return element.all(by.xpath('//table//tr[${restaurantIndex + 2}]' +
            `//fm-rating[@ng-model="$parent.restaurant.${ratingFilterName}"]//*[contains(@class,"fm-selected")]`))
    };


    this.clearRating = function () {
        browser.wait(EC.visibilityOf(clearRatingButton), 10000, 'Clear link for Price filter is not visible');
        clearRatingButton.click()
    };

    this.clearPrice = function () {
        browser.wait(EC.visibilityOf(clearPriceButton), 10000, 'Clear link for Price filter is not visible');
        clearPriceButton.click()
    };

    this.setCuisine = function (type) {
        element(by.xpath(`//ng-view/div/div[1]/form/div/label/input[@value = '${type}']`)).click()
    };

    this.getListOfRestaurantNames = function () {
        return listOfRestaurantNames
    };

    this.waitForResultsLoading = function () {
        browser.wait(EC.visibilityOf(controlMessage), 10000)
    };

    this.waitForSpecificNumberOfResultsLoading = function (numberOfResults) {
        browser.wait(EC.textToBePresentInElement(controlMessage, `${numberOfResults} restaurants found`))
    };

    this.moveMouseToFilter = function () {
        browser.actions().mouseMove(ratingFilter).perform()
    }
};

module.exports = new homePage();