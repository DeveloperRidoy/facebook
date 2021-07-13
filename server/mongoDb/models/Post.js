const mongoose = require('mongoose');
const { POST, QA } = require('../../../utils/global/variables');

const PostSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: {
      values: [POST, QA],
      message: `post type must be one of these ['${POST}', '${QA}']`,
    },
    required: [true, `post must have one of the types of ['${POST}', '${QA}']`],
  },
  text: String,
  images: [String],
  videos: [String],
  hearts: Number,
  likes: Number,
  answers: [Object],
  comments: [Object],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "post must have have user"],
  },
});

const Post = mongoose.model('post', PostSchema)

 
module.exports = Post;