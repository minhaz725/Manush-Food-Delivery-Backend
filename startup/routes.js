const express = require('express')
const users = require('../routes/users')
const items = require('../routes/items')
const orders = require('../routes/orders')

module.exports = function(app) {
    app.use(express.json(app)) 
    app.use('/api/users',users);
    app.use('/api/items',items);
    app.use('/api/orders',orders);

}
