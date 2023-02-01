// here is the begining
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
require('dotenv').config()
const dbURL = process.env.MONGO_URL

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// OnConneection 
mongoose.connection.on('connected', ()=>{
    console.log("Connected to DB: " + dbURL)
})

mongoose.connection.on('error', (er) => {
    console.log("db connection error :"+ er )
})

 
const app = express()


app.get('/', (req,res) => {
    res.send('Hello world');
})

const port = 3000;

// middlewares , bodyParser, passport, session 
app.use(cors())
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SECRET
}))

// app.use(passport.initialize())
// app.use(passport.session())











app.listen(port, () => {
    console.log("Server is running in port "+ port)
})
