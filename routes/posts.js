const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post");
const Comment = require("../schemas/comment");

//show
router.get("/posts", async (req, res) => {
  const posts = await Posts.find();
  res.json({posts});
});

router.get('/', (req, res) => {
	res.send('this is home page');
});

//select id
router.get("/posts/:postsId", async (req, res) => {
   const { postsId } = req.params;
	 const posts = await Posts.find({ postsId });
        res.json({posts});
});

//input posts
router.post("/posts", async (req, res) => {
	const { postsId, title, authorName, password, content } = req.body;

  const posts = await Posts.find({ postsId });
  if (posts.length) {
    return res.status(400).json({ success: false, errorMessage: "The data already exists." });
  }

  const createdPosts = await Posts.create({ postsId, title, authorName, password, content });

  res.json({ posts: createdPosts, result: "Success" });
});

//update item
router.put("/posts/:password", async (req, res) => {
  const { password } = req.params;
  const { title, authorName, content } = req.body;

  const existsPosts = await Posts.find({ password: Number(password) });
  if (existsPosts.length) {
    await Posts.updateOne({ password: Number(password) }, 
    { $set: {title, authorName, content } });
  }

  res.json({ result: "success for update", success: true });
})

//remove
router.delete("/posts/:password", async (req, res) => {
  const { password } = req.params;

  const existsPosts = await Posts.find({ password });
  if (existsPosts.length > 0) {
    await Posts.deleteOne({ password });
  }

  res.json({ result: "success" });
});

//input comment
router.post("/posts/:postsId/comment", async (req, res) => {
  const { postsId } = req.params;
  const { commentContent } = req.body;

  const existsComments = await Comment.find({ postsId: Number(postsId) });
  if (existsComments.length) {
    return res.json({ success: false, errorMessage: "Please enter the comment content" });
  }
  await Comment.create({ postsId: Number(postsId), commentContent: commentContent });
  res.json({ result: "success" });
});


//update item
router.put("/posts/:postsId/comment", async (req, res) => {
  const { postsId } = req.params;
  const { commentContent } = req.body;

  const existsComments = await Comment.find({ postsId: Number(postsId) });
  if (existsComments.length) {
    await Comment.updateOne({ postsId: Number(postsId) }, 
    { $set: { commentContent } });
  }

  res.json({ result: "success", success: true });
})

//remove
router.delete("/posts/:postsId/comment", async (req, res) => {
  const { postsId } = req.params;

  const existsComments = await Comment.find({ postsId });
  if (existsComments.length > 0) {
    await Comment.deleteOne({ postsId });
  }

  res.json({ result: "Please enter the comment content" });
});


module.exports = router;