let helper = function () {


    this.getRandomNumeric = (length) => {
        let value = ""
        const possible = "0123456789"
        for (let i = 0; i < length; i++)
            value += possible.charAt(Math.floor(Math.random() * possible.length))
        return value
    }

    this.getRandomSymbol = (length) => {
        let value = ""
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz=+-_!@#$%^&*()"
        for (let i = 0; i < length; i++)
            value += possible.charAt(Math.floor(Math.random() * possible.length))
        return value
    }

    this.getSpecialSymbol = (length) => {
        let value = ""
        const possible = "=+-_!@#$%^&*():;/<>,.~{}[]"
        for (let i = 0; i < length; i++)
            value += possible.charAt(Math.floor(Math.random() * possible.length))
        return value
    }

    this.getRandomLetter = (length) => {
        let value = ""
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (let i = 0; i < length; i++)
            value += possible.charAt(Math.floor(Math.random() * possible.length))
        return value
    }

    this.getRandomChineseCharacters = (length) => {
        let value = ""
        const possible = "阿贝非给得也用热赛伊伊可罗肯卡艾了艾姆恩哦佩艾和艾斯泰吴艾弗哈册切沙夏图路迪斯尼亚克俄灭斯迪斯尼亚克诶哟亚"
        for (let i = 0; i < length; i++)
            value += possible.charAt(Math.floor(Math.random() * possible.length))
        return value
    }

    this.getRandomInt = (min, max) => {
        return Math.floor(Math.random() * max + min)

    }


}

module.exports = new helper()