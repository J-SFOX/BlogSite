const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()


const env = process.env

router.post('/register', (req, res, next) => {
    let newUser = new User({
        fullname: req.body.username,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, (err, _user)=> {
        if(err) {
            res.status(500).json({success: false, msg:'failed to register user'})
            throw err
        }else{
            res.status(201).json({success: true, msg:'user registered successfully' })
        }
    })
});
router.post('/login', (req, res, next) => {
    // getting the username and password from the request
    const username = req.body.username 
    const password = req.body.password
    // get the user from the database using the username
    User.getUserByUsername(username, (err, _user) => {
        // handling errors
        if( err ) throw err;
        if (!_user){ // user not found
            res.json({success: false, msg: "User Not Found"})
        }else{ // user exists
            // compare the passwords
            User.comparePassword(password, _user.password, (error, isMatch) =>{
                if(error) throw error;
                if(isMatch){ // there is a match between hashed pwd and the candidate pws
                    // sign the jwt 
                    const token = jwt.sign({
                        data: _user
                    }, env.SECRET, { 
                        expiresIn: 604800  // week
                    } )
                    // send a json response which contains the token and authenticated user info
                    res.status(200).json({
                        success: true,
                        token : `Bearer ${token}`,
                        user: {
                            id: _user._id ,
                            fullname: _user.fullname ,
                            email: _user.email,
                            username: _user.username,
                        },
                        msg : 'User Logged In'
                    })
                }else{
                    res.json({success :false, msg: "Wrong Password"})
                }
            })
        }
    })
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
   res.json({
    user: {
        _id: req.user._id,
        fullname: req.user.fullname,
        username: req.user.username,
        email: req.user.email,
    }
   })
});






module.exports = router