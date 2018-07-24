//jshint strict: false
exports.config = {

    allScriptsTimeout: 11000,

    specs: [
        './tests/*.js'
    ],

    capabilities: {
        'browserName': 'chrome',
        shardTestFiles: true,
        maxInstances: 4
    },

    baseUrl: 'https://lit-basin-41473.herokuapp.com/#/customer',

    framework: 'jasmine',

    params: {
        name: 'Joe Black',
        address: '432 Wiggly Rd, Mountain View, 94043'
    },


    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    suites: {
        highPriority: ['tests/homePageTests/*high.js', 'tests/orderPageTests/*high.js', 'tests/checkoutPageTests/*high.js'],
        mediumPriority: ['tests/homePageTests/*medium.js', 'tests/checkoutPageTests/*medium.js'],
        all: ['tests/homePageTests/*.js', 'tests/orderPageTests/*.js', 'tests/checkoutPageTests/*.js']

    },

    onPrepare: function () {
        let AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });

        let log4js = require('log4js');
        global.logger = require('log4js').getLogger();
        global.logger.level = 'info';
        global.EC = protractor.ExpectedConditions
    }

};
