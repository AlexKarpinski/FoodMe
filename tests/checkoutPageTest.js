let homePage = require('../pages/homePage.js')
let orderPage = require('../pages/orderPage.js')
let ratingData = require('../testing-data/ratingData.module.js')

describe('Creating of the random order on the orderPage: ', function () {

    beforeAll(function () {
        logger.info("TEST PREPARATION")
        let randomRestaurantIndex = Math.floor((Math.random() * ratingData.totalNumberOfResults))
        orderPage.openOrderForRestaurantByIndex(randomRestaurantIndex)
        orderPage.addRandomDishesToOrder()

        logger.info("PREPARATION COMPLETED")
    })
    /* afterEach(function () {
         orderPage.reload()
     })*/

    describe('Testing of the order list: ',  function () {
        it('Deleting of dishes from the order list: ', async function () {
            browser.driver.sleep(3000)
             console.log( await  element(by.xpath('/html/body/div/ng-view/form/div/h4')).getText)


        })


    })

})
