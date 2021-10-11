require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const users = require('./routes/users')
const app = express()

mongoose.connect('mongodb://localhost/food')
    .then(() => console.log('Connected to MongoDB. '))
    .catch(err => console.error('Could not connect to MongoDB'));

app.use(express.json()) 
app.use('/api/users',users);


app.listen(3000)