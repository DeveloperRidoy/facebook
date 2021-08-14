const mongoose = require('mongoose');
const { REQUESTED, FRIENDS, ADD_FRIEND, PENDING } = require('../../../utils/global/variables');

const FriendsSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "requster is required"],
    },
    recepient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "recepient is required"],
    },
    status: {
      type: String,
      default: REQUESTED,
      enum: {
        values: [REQUESTED, FRIENDS, ADD_FRIEND, PENDING],
        message: `status must be one of [ '${ADD_FRIEND}','${REQUESTED}','${PENDING}', '${FRIENDS}' ]`,
      },
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
    seen: {
      type: Boolean,
      default: false,
      validate: {
        validator: bool => typeof bool === 'boolean',
        message: "\"seen\" field must be a boolean"
      }
    }
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// pre find middleware 
FriendsSchema.pre(/^find/, function (next) {
  this.populate({ path: 'requester recepient', select: 'firstName fullName photo email slug' });
  next()
})

const Friend = mongoose.model('friend', FriendsSchema); 

module.exports = Friend;