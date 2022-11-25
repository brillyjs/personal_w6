const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String
  },
  authorName: {
    type: String
  },
  password: {
    type: Number,
    unique: true
  },
  content: {
    type: String
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Posts", postsSchema);
