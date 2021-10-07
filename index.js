const express = require('express')
const app = express()

app.use(express.json()) 

const users = []

app.get('/' , (req, res) => {
    res.send("hello world")
})



app.listen(3000)