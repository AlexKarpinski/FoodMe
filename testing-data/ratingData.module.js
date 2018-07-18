"use strict";

module.exports = {
    totalNumberOfResults: 39,
    ratings: {
        "ONE STAR": {rating: 1, numberOfRestaurant: 4},
        "TWO STARS": {rating: 2, numberOfRestaurant: 10},
        "THREE STARS": {rating: 3, numberOfRestaurant: 7},
        "FOUR STARS": {rating: 4, numberOfRestaurant: 10},
        "FIVE STARS": {rating: 5, numberOfRestaurant: 8}
    },

    prices: {
        "ONE STAR PRICE": {price: 1, numberOfRestaurant: 4},
        "TWO STARS PRICE": {price: 2, numberOfRestaurant: 7},
        "THREE STARS PRICE": {price: 3, numberOfRestaurant: 13},
        "FOUR STARS PRICE": {price: 4, numberOfRestaurant: 11},
        "FIVE STARS PRICE": {price: 5, numberOfRestaurant: 4}
    },

    combinations: [
        {rating: 1, price: 2, numberOfRestaurant: 4},
        {rating: 2, price: 3, numberOfRestaurant: 7},
        {rating: 2, price: 4, numberOfRestaurant: 3},
        {rating: 3, price: 3, numberOfRestaurant: 3},
        {rating: 4, price: 5, numberOfRestaurant: 4}
    ],

    cuisine: [
        {type: "african", restaurants: ["Khartoum Khartoum", "Carthage"]},
        {type: "american", restaurants: ["Sally's Diner", "Burgerama"]},
        {type: "barbecue", restaurants: ["Saucy Piggy", "Three Little Pigs"]},
        {type: "cafe", restaurants: ["North by Northwest", "Full of Beans", "Tropical Jeeve's Cafe", "Zardoz Cafe"]},
        {type: "chinese", restaurants: ["Beijing Express", "Dragon's Tail", "Super Wonton Express", "Shandong Lu"]},
        {type: "czech/slovak", restaurants: ["Czech Point", "Little Prague"]},
        {type: "german", restaurants: ["Esther's German Saloon", "Der Speisewagen", "Kohl Haus"]},
        {type: "indian", restaurants: ["Curry Up", "Birmingham Bhangra", "Naan Sequitur", "Curry Galore"]},
        {type: "japanese", restaurants: ["Robatayaki Hachi", "Sakura"]},
        {type: "mexican", restaurants: ["Cancun", "The Whole Tamale", "Taqueria", "Pedro's"]},
        {
            type: "pizza",
            restaurants: ["Angular Pizza", "Flavia", "Luigi's House of Pies", "Thick and Thin", "When in Rome", "Pizza 76"]
        },
        {type: "thai", restaurants: ["Satay Village", "Hit Me Baby One More Thai"]},
        {type: "vegetarian", restaurants: ["BBQ Tofu Paradise"]}
    ]
};