const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const ENV = process.env


const Schema = mongoose.Schema


const UserSchema = new Schema({
    fullname : {
        type : String,
        trim : true,
    },
    email :{
        type: String,
        required : true,
        lowercase : true,
        trim : true
    },
    username :{
        type : String,
  
    }, 
    password :{
        type : String,
        required : true
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

const User = module.exports = mongoose.model('User', UserSchema)

// get User by ID
module.exports.getUserById = (user_id, callback) => {
    User.findById(user_id,callback)
} 


// get User by Username
module.exports.getUserByUsername = (_username, callback) => {
    const query = {username : _username}
    
    User.findOne(query, callback)
} 

// add new User
module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password ,salt, (err, hash) => {
            //  store user to DB
            if(err) throw err;
            newUser.password = hash
            newUser.save(callback)
        })
    })
} 



// compare the candidate password with the hashed one 
module.exports.comparePassword = (password, hashedPassword, callback) =>{
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
}

module.exports.deleteBlog=(blogId, user_id, callback)=> {
    User.updateOne(
        { _id: user_id },
        { $pull: { blogs: blogId } },
        callback
      );
}

