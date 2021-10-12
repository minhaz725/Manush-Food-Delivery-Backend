const mongoose = require('mongoose')
const { saveItems } = require('../seed/item-seeder');

if(process.env.NODE_ENV === "developement") {
    saveItems();
}    


module.exports = function() {
    mongoose.connect('mongodb://localhost/food')
    .then(() => console.log('Connected to MongoDB. '))
    .catch(err => console.error('Could not connect to MongoDB'));
}
