const mongoose = require('mongoose');
const { POST, QA } = require('../../../utils/global/variables');

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
    images: [String],
    videos: [String],
    audios: [String],
    hearts: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: [true, "user is required to like"],
        },
      },
    ],
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: [true, "user is required to like"],
        },
      },
    ],
    care: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: [true, "user is required to like"],
        },
      },
    ],
    haha: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: [true, "user is required to like"],
        },
      },
    ],
    wow: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: [true, "user is required to like"],
        },
      },
    ],
    sad: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: [true, "user is required to like"],
        },
      },
    ],
    comments: [
      {
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
        replies: [
          {
            replyTo: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
              required: [true, "replyTo is required"],
            },
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
              required: [true, "user is required to reply"],
            },
            text: {
              type: String,
              required: [true, "text is required"],
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
            replies: [
              {
                replyTo: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "user",
                  required: [true, "user is required"],
                },
                user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "user",
                  required: [true, "user is required"],
                },
                text: {
                  type: String,
                  required: [true, "text is required"],
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
            ],
          },
        ],
      },
    ],
    createdAt: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "post must have have user"],
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
  return this.createdAt.getTime()
})

PostSchema.pre('save', function (next) {
  this.createdAt = Date.now;
  next()
})

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user comments.user comments.replies comments.replies.replies', select: 'firstName surName fullName photo'
  });

  next();
})

const Post = mongoose.model("post", PostSchema);

module.exports = Post;