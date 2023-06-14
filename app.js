const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { MongoClient, ServerApiVersion } = require('mongodb');
//import route

const userRoute = require('./routes/user')

const uri = process.env.DATABASE;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    console.log('Mongodb Database connected')
})

//middleware

app.use(morgan('dev'))
app.use(bodyParser.json())

//Route middleware
app.use('/api', userRoute)

const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`app is running ${port}`)
})
