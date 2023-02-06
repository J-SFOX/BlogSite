const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const ENV = process.env


// const User = require('./user')
const Schema = mongoose.Schema


const BlogSchema = new Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Blog = module.exports = mongoose.model('Blog', BlogSchema)


module.exports.getAllBlogs =  (callback) => {
    Blog.find(callback)
}
//  see if its necessary to use the callback
module.exports.addBlog = (_blog, callback) => {
    _blog.save(callback)
}

 module.exports.getBlogById =  (_id,callback) => {
    Blog.findById(_id, callback);
 }

 module.exports.updateBlog =  (blogId, updatedBlog, callback) => {
    Blog.updateOne({ _id: blogId }, updatedBlog, callback);
    // Blog.findByIdAndUpdate(_id, updatedBlog);
 }

 module.exports.getUsersBlog = (userId, callback) =>{
    Blog.find({creator: userId}, callback)
 }

 module.exports.deleteBlog = (_id, callback) => {
    Blog.findByIdAndDelete(_id,callback);
 }