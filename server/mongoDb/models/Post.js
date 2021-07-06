const mongoose = require('mongoose');
const { POST, QA } = require('../../../utils/global/variables');

const errors = (content) => {
  const errors = [];
  const { text, images, videos } = content;
  
  //(1) check if necessay info is provided
    if (!text && !images && !videos) {
        errors.push(
          "Please provide a content object containing atleast a property of text(String), images(array), or videos(array)"
        );
        return errors;
    }
      
    //(2) check if data is proper type
    if (typeof content !== "object" || content !== null) {
      errors.push("Content must be an object");
      return errors;
    }
  if (text && typeof text !== "string") {
    errors.push("text must be string");
    return errors;
  }
  if (images && !Array.isArray(images)) {
    errors.push("images must be an array of strings");
    return errors;
  }
  if (images.some((str) => typeof str !== "string")) {
    errors.push("images must be an array of strings");
    return errors;
  }
  if (videos && !Array.isArray(videos)) {
    errors.push("videos must be an array of strings");
    return errors;
  }
  if (videos.some((str) => typeof str !== "string")) {
    errors.push("videos must be an array of strings");
    return errors;
  }
};;

const PostSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: {
      values: [POST, QA],
      message: `post type must be one of these ['${POST}', '${QA}']`,
    },
    required: [true, `post must have one of the types of ['${POST}', '${QA}']`],
  },
  content: {
    type: Object,
    text: String,
    images: [String],
    videos: [String],
    required: [
      true,
      "post must have a content object with properties of atleast text(String), imgases(array) or videos(array)",
    ],
    validate: {
        validator: content => errors(content).length === 0,
        message: content => console.log(content)
    },
  },
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