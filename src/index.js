const express = require('express')
const mongoose = require("mongoose")

const route = require('./routes/route')

const app = express()

mongoose.connect("mongodb+srv://sumit:sumit@cluster0.8dflsuw.mongodb.net/coding_arena")
    .then(() => { console.log("Mongodb connected successfully") })
    .catch((err) => { console.log(err) })

app.use(express.json())
app.use('/', route)

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("server is running on port " + port)
})

