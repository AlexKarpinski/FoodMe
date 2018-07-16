let message = element(by.xpath("//ng-view/div/h1"));

let confirmPage = function () {
    this.getFinalMessage  = async function () {
        return  await message.getText()
    };
};

module.exports = new confirmPage();