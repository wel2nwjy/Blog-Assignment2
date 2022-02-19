const express = require('express'); 
const postsRouter = express.Router();
const Posts = require("../model/BlogDB");


//CREATE POST
postsRouter.post("/", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
postsRouter.put("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Posts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
postsRouter.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
postsRouter.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POST
postsRouter.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Posts.find({ username });
    } else if (catName) {
      posts = await Posts.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Posts.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = postsRouter;