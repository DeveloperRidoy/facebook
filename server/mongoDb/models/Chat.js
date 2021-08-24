const mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "chat must have a sender"],
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "chatId is required"],
    },
    is_group_message: { type: Boolean, default: false },
    message: String,
    photos: [String],
    videos: [String],
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    createdAt_ms: {
      type: Number,
      default: function () {
        if (this.createdAt) {
          return this.createdAt.getTime();
        } else {
          return new Date().getTime();
        }
      },
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

ChatSchema.pre(/^find/, function (next) {
  this.populate({path: 'sender participants', select: 'firstName fullName photo slug email'});
  next();
})

const Chat = mongoose.model('chat', ChatSchema);

module.exports = Chat;