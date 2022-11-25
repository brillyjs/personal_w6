const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true
  },
  commentContent: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("comment", commentSchema);
