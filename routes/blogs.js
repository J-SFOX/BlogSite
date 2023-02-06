const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// get all Blogs , Read
router.get("", (req, res, next) => {
  Blog.getAllBlogs((err, _data) => {
    if (err) {
      res.json({ success: false, msg: "retrieving failed", data: [] });
      throw err;
    }
    res.json({ success: true, msg: "retrieving succeed", data: _data });
  });
});

// get one Blog ==> details
router.get("/:id", (req, res, next) => {
  const blog_id = req.params.id;
  Blog.getBlogById(blog_id, (err, _blog) => {
    if (!_blog) {
        console.log('this is err ', err)
      res.status(500).json({ success: false, msg: "failed to find blog" });
    } else{
        console.log('this is err ', err)
      res.status(200).json({ success: true, msg: "blog found", data: { _blog } });
    }
    
  });
});

// Create Blog , Create
router.post("/create", (req, res, next) => {
  // creating new book
  const newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
    creator: req.body.creator,
  });

  Blog.addBlog(newBlog, async (err, _blog) => {
    if (err) {
      res.status(500).json({ success: false, msg: "failed to register blog" });
      throw err;
    } else {
      res.status(201).json({ success: true, msg: "success register blog" });
      const creator = await User.findById({ _id: _blog.creator });
      creator.blogs.push(_blog);
      await creator.save();
    }
  });
});

// Update Blog ,
router.patch("/update/:id", (req, res, next) => {
    const blogId = req.params.id
    const updatedBlog = req.body
    Blog.updateBlog(blogId, updatedBlog, (err) => {
        if(err) {
            res.status(500).json({success : false, msg :" Failed to update the blog"})
            throw err;
        } else {
            res.status(200).json({success : true, msg :" blog updated successfully"})
        }
    })
       
});

// delete
router.delete("/delete/:id&:user_id", (req, res, next) => {
  const blogId = req.params.id;
  const creator = req.params.user_id;
  console.log("this the user id", creator);
  console.log("this the blog id", blogId);
  Blog.deleteBlog(blogId, (err) => {
    if (err) {
      res.json({ success: false, msg: "failed delete request from Blogs" });
      throw err;
    } else {
      User.deleteBlog(blogId, creator, (err) => {
        if (err) {
          res.json({ success: false, msg: "failed delete request from Users" });
          throw err;
        }else{
            res.json({success:true, msg: "Blog deleted successfully"})
        }
      });
    }
  });
});

router.get('/user/:id', (req, res, next) => {
    const userId = req.params.id
     Blog.getUsersBlog( userId,(err, blogs) => {
         if(err) throw err;
         if(!blogs){
             res.json({success: false, msg: 'User not found'})
         }
         else{
             res.json({success: false, msg: 'request succeed', data: blogs})
         }
     })
 })

module.exports = router;
