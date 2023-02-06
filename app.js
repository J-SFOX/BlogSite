// here is the begining
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
require('dotenv').config()
const dbURL = process.env.MONGO_URL
mongoose.set('strictQuery', false);
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// OnConneection 
mongoose.connection.on('connected', ()=>{
    console.log("Connected to DB: " + dbURL)
})

mongoose.connection.on('error', (er) => {
    console.log("db connection error :" + er )
})

 
const app = express()



// routers : 
const users = require('./routes/users')
const blogs = require('./routes/blogs')

const port = 3000;

// middlewares , bodyParser, passport, session 
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.json())

app.use(session({
    secret: process.env.SECRET
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use('/users', users)
app.use('/blogs', blogs)


app.get('/', (req,res) => {
    res.send('** Invalid Endpoint **');
})




app.listen(port, () => {
    console.log("Server is running in port "+ port)
})
