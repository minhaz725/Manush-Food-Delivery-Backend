require('dotenv').config()
const express = require('express')
var cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())
app.use(express.json())

require('./startup/db')()
require('./startup/routes')(app)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App runnung in mode : ${ process.env.NODE_ENV} \n Listening on port ${port}...`));