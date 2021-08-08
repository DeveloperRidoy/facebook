const mongoose = require('mongoose');
const { POST, QA, COMMENT, REPLY, REPLY_TO_REPLY } = require('../../../utils/global/variables');

const userRefSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required to like"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdAt_ms: {
      type: String,
      default: function () {
        return this.createdAt.getTime();
      },
    },
  },
);

const PostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: {
        values: [POST, QA],
        message: `post type must be one of these ['${POST}', '${QA}']`,
      },
      required: [
        true,
        `post must have one of the types of ['${POST}', '${QA}']`,
      ],
    },
    group: String,
    text: String,
    qaText: String,
    postBackground: String,
    qaBackground: String,
    photos: [String],
    videos: [String],
    audios: [String],
    likes: [userRefSchema],
    comments: [
      {
        type: {
          type: String,
          default: COMMENT,
          enum: {
            values: [COMMENT, REPLY],
            message: `comment must be one of these types ['${COMMENT}', '${REPLY}']`,
          },
        },
        replyTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        replyCommentId: mongoose.Schema.Types.ObjectId,
        mension: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: [true, "user is required to comment"],
        },
        text: {
          type: String,
          required: [true, "text is required to reply"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        createdAt_ms: {
          type: String,
          default: function () {
            return this.createdAt.getTime();
          },
        },
        likes: [userRefSchema],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "post must have user"],
    },
    audience: {
      type: String,
      default: "PUBLIC",
      enum: {
        values: ["PUBLIC", "FRIENDS", "ONLY_ME"],
        message:
          "aundience can only be one of ['PUBLIC', 'FIRENDS', 'ONLY_ME']",
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { Virtuals: true } }
);

// virtual fields 
PostSchema.virtual('createdAt_ms').get(function () {
  if (this.createdAt) return this.createdAt.getTime();
  return null   
})

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user likes.user comments.replyTo comments.user comments.mension comments.likes.user', select: 'firstName surName fullName photo slug'
  });

  next();
})

const Post = mongoose.model("post", PostSchema);

module.exports = Post;