let homePage = require('../pages/homePage.js')
let helper = require('../helper/helper.js');
let ratingData = require('../testing-data/ratingData.module.js');

let orderPage = function () {
    let countOfDishes
    let listOfDishes = element.all(by.xpath('//ng-view/div[2]/div[1]/ul/li[@ng-repeat = "menuItem in restaurant.menuItems"]'))
    let listOfOrderedDishes = element.all(by.xpath('//ng-view/div[2]/div[2]/form/ul/li[@ng-repeat = "item in cart.items"]'))
    let menu = element(by.xpath('//ng-view/div[2]/div[1]/ul/li[1]/a'))
    let totalSum = element(by.xpath('//ng-view/div[2]/div[2]/form/p/b'))
    let checkoutButton = element(by.xpath("//div[@ng-show = 'cart.items.length']"))

    this.openOrderForRestaurantByIndex = function (restaurantIndex) {
        homePage.openHomePage()
        logger.info(`WHEN user chooses restaurant # ${restaurantIndex} at the home page`)
        this.getRestaurantByIndex(restaurantIndex).click()
        logger.info(`THEN Order menu is presented`)
        browser.wait(EC.visibilityOf(menu), 10000, 'Menu is not visible')
    }

    this.openOrderPageForRandomRestaurant = async function (restaurantIndex) {
        let randomRestaurantIndex = helper.getRandomInt(0, ratingData.totalNumberOfResults)
        await this.openOrderForRestaurantByIndex(randomRestaurantIndex);
    }

    this.getRestaurantByIndex = function (restaurantIndex) {
        return element(by.xpath(`//ng-view/div/div[2]/table/tbody/tr[${restaurantIndex + 2}]/td[1]/a/b`))
    }

    this.getTotalCountOfDishes = async function () {
        let totalCount = await listOfDishes.count()
        return totalCount
    }

    this.getNumberOfOrderedDishes = function () {
        return listOfOrderedDishes.count()
    }

    this.deleteDishesFromList = function () {
        element(by.xpath('//ng-view/div[2]/div[2]/form/ul/li[1]/a')).click()
    }

    this.reload = function () {
        browser.refresh()
    }

    this.getPrice = function (count) {
        element(by.xpath(`//ng-view/div[2]/div[1]/ul/li[${position + 1}]`)).click()
        return element(by.xpath(`//ng-view/div[2]/div[1]/ul/li[${position + 1}]/a/span[2]`)).getText()
    }

    this.chooseDishByIndex = async function (index, numberTimesToAdd) {
        for (let i = 0; i < numberTimesToAdd; i++) {
            this.getDishNameElementInMenuByIndex(index).click()
        }
        browser.wait(this.isDishAddedToOrder(index, numberTimesToAdd), 10000, 'order is not visible')
    }

    this.isDishAddedToOrder = async function (index, numberOfTimesToAdd) {
        let el = element.all(by.xpath('//div[contains(@class,"fm-cart")]//li'))
        browser.wait(EC.presenceOf(el), 10000, 'order is not visible')
        let count = await el.count()
        let isDishAddedToOrder = false
        for (let i = 0; i < count; i++) {
            logger.info("ELEMENT TEXT: " + await element.all(by.xpath(`//ng-view/div[2]/div[2]/form/ul/li[${i + 1}]`)).getText())
            let text = await element.all(by.xpath(`//ng-view/div[2]/div[2]/form/ul/li[${i + 1}]`)).getText()
            if (text.includes(`${numberOfTimesToAdd} × ${this.getDishNameByIndex(index)}`) == true) {
                return isDishAddedToOrder
            }
        }
        return isDishAddedToOrder
    }


    this.getDishNameByIndex = function (index) {
        return this.getDishNameElementInMenuByIndex(index).getText()
    }

    this.getDishPriceByIndex = function (index) {
        return this.getDishPriceElementFromByIndex(index).getText()
    }

    this.getDishNameElementInMenuByIndex = function (index) {
        return element(by.xpath(`//ng-view/div[2]/div[1]/ul/li[${index + 1}]/a/span[1]`))
    }

    this.getDishPriceElementFromByIndex = function (index) {
        return element(by.xpath(`//ng-view/div[2]/div[1]/ul/li[${index + 1}]/a/span[2]`))
    }

    this.calculateOrderSum = async function (dishesAddedToOrder) {
        let sum = 0
        for (let dishIndex of dishesAddedToOrder.keys()) {
            let price = await this.getDishPriceByIndex(dishIndex)
            sum = sum + (+price) * dishesAddedToOrder.get(dishIndex)
        }
        return sum.toFixed(2)
    }


    this.addRandomDishesToOrder = async function (dishesData) {
        for (let dishIndex of dishesData.keys()) {
            this.chooseDishByIndex(dishIndex, dishesData.get(dishIndex))
        }
        this.waitForTotalSumLoading(await this.calculateOrderSum(dishesData))
    }

    this.waitForTotalSumLoading = async function (totalSum) {
        browser.wait(EC.visibilityOf(`//*[contains(text(),"Total: $${totalSum}")]`), 10000,
            `Actual value of sum ${await totalSum.getText()}`)
    }

    this.generateDishesData = async function () {
        const MAX_NUMBER_OF_PORTIONS = 10
        let totalCountOfDishes = await this.getTotalCountOfDishes()
        let countOfPositionsToAdd = helper.getRandomInt(1, totalCountOfDishes)
        let dishesAddedToOrder = new Map()
        for (let i = 0; i < countOfPositionsToAdd; i++) {
            let indexOfDish = helper.getRandomInt(0, totalCountOfDishes)
            if (dishesAddedToOrder.has(indexOfDish) == false) {
                let numberOfTimesToAdd = helper.getRandomInt(1, MAX_NUMBER_OF_PORTIONS)
                dishesAddedToOrder.set(indexOfDish, numberOfTimesToAdd)
            } else {
                i--
            }
        }
        for (let dishIndex of dishesAddedToOrder.keys()) {
            console.log(dishIndex + "---" + dishesAddedToOrder.get(dishIndex) +
                "---" + await this.getDishPriceByIndex(dishIndex) +
                "---" + await this.getDishNameByIndex(dishIndex))
        }
        return dishesAddedToOrder
    }

    this.getTotalSum = async function () {
        browser.wait(EC.visibilityOf(totalSum), 10000, 'Menu is not visible')
        let sum = await totalSum.getText()
        let orderSum = sum.substring(8)
        return orderSum
    }

    this.isTotalSumCorrect = async function (expectedTotalSum) {
        browser.wait(EC.visibilityOf(`//*[contains(text(),"Total: $${expectedTotalSum}")]`), 10000,
            `Actual value of sum ${await totalSum.getText()}`)
        return await (await totalSum.getText()).substring(8)
    }

    this.checkoutOrder = async function () {
        checkoutButton.click()
    }

    this.createOrder = async function () {
        logger.info("WHEN User user adds dishes into the order")
        let dishesData = this.generateDishesData()
        await this.addRandomDishesToOrder(await dishesData)
        let expectedTotalSum = await this.calculateOrderSum(await dishesData)
    }

}

module.exports = new orderPage()