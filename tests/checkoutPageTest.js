let homePage = require('../pages/homePage.js')
let orderPage = require('../pages/orderPage.js')
let ratingData = require('../testing-data/ratingData.module.js')

xdescribe('Creating of the random order on the orderPage: ', function () {

    beforeAll(function () {
        browser.ignoreSynchronization = true
        browser.get(browser.baseUrl)
        logger.info(`WHEN: User sets delivery data to the customer form: ${browser.params.name}, ${browser.params.address}`)
        browser.wait(EC.visibilityOf(element(by.id('customerName'))), 10000)
        homePage.setDeliveryData(browser.params.name, browser.params.address)
    })
    /* afterEach(function () {
         orderPage.reload()
     })*/

    describe('Testing of the order list: ',  function () {
        it('Deleting of dishes from the order list: ', async function () {
            browser.driver.sleep(3000)
         //    console.log( await  element(by.xpath('/html/body/div/ng-view/form/div/h4')).getText)


        })


    })

})
