const mongoose = require('mongoose')

module.exports = function() {
    mongoose.connect('mongodb://localhost/food')
    .then(() => console.log('Connected to MongoDB. '))
    .catch(err => console.error('Could not connect to MongoDB'));
}
if(process.env.NODE_ENV === "developement") {
    //run seed
}    
