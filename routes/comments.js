const express = require("express");
const Posts = require("../schemas/post");
const Comment = require("../schemas/comment");
const router = express.Router();

router.get("/comments", async (req, res) => {
  const comments = await Comment.find();
  const postsIds = comments.map((comment) => comment.postsId);

  const posts = await Posts.find({ postsId: postsIds });

  const results = comments.map((comment) => {
		return {
			commentContent: comment.commentContent,
			posts: posts.find((item) => item.postsId === comment.postsId)
		};
  });

  res.json({
    comments: results,
  });
});

module.exports = router;