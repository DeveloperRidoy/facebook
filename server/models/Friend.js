import mongoose from "mongoose";
import {
  REQUESTED,
  FRIENDS,
  ADD_FRIEND,
  PENDING,
} from "../../utils/global/variables";

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
    createdAt_ms: {
      type: String,
      default: function () {
        if (this?.createdAt) return this.createdAt.getTime();
        return "";
      },
    },
    seen: {
      type: Boolean,
      default: false,
      validate: {
        validator: (bool) => typeof bool === "boolean",
        message: '"seen" field must be a boolean',
      },
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

// pre find middleware
FriendsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "requester recepient",
    select: "firstName fullName photo email slug",
  });
  next();
});

const Friend =
  mongoose.models.friend || mongoose.model("friend", FriendsSchema);

export default Friend;
