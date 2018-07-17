
let confirmPage = function () {
    let message = element(by.xpath("//ng-view/div/h1"));

    this.getFinalMessage = async function () {
        return await message.getText()

    }

};

module.exports = new confirmPage();