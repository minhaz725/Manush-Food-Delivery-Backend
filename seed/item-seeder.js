
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/food')
    .then(() => console.log('Connected to MongoDB. '))
    .catch(err => console.error('Could not connect to MongoDB'));

const { Item, validate} = require('../models/item')

var items = [ 
    new Item({
    name: 'Soup',
    type: 'Appetizer',
    price: 10
    }),
    new Item({
        name: 'Fried Chicken',
        type: 'Appetizer',
        price: 15
    }),
    new Item({
        name: 'Salad',
        type: 'Appetizer',
        price: 15
    }),
    new Item({
        name: 'Fried Rice',
        type: 'Meal',
        price: 20
    }),
    new Item({
        name: 'Beef Chilli',
        type: 'Meal',
        price: 20
    }),
    new Item({
        name: 'Honey Chicken',
        type: 'Meal',
        price: 15
    }),
    new Item({
        name: 'Fish Curry',
        type: 'Meal',
        price: 20
    }),
    new Item({
        name: 'Ice-cream',
        type: 'Dessert',
        price: 10
    }),
    new Item({
        name: 'Faluda',
        type: 'Dessert',
        price: 15
    }),
    new Item({
        name: 'Soft Drinks',
        type: 'Drinks',
        price: 5
    })
];


async function saveItems() {

    for (var i=0; i< items.length; i++) {
        await items[i].save()
        
    }
    mongoose.disconnect();
}

saveItems()