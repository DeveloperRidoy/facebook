import { roles } from "../../utils/server/variables";
import uniqueValidator from "mongoose-unique-validator";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { ADMIN, USER } = roles;
const {
  SINGLE,
  IN_A_RELATIONSHIP,
  ENGAGED,
  MARRIED,
  SEPARATED,
  COMPLICATED,
  DIVORCED,
} = require("../../utils/global/variables");

// function to set slug
const setSlug = function (doc) {
  return doc.surName
    ? (doc.firstName + " " + doc.surName)?.split(" ")?.join("-")
    : doc.firstName?.split(" ")?.join("-");
};

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your firstName"],
      unique: true,
      uniqueCaseInsensitive: true,
    },
    surName: String,
    email: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true,
      required: [true, "Please provide your email address"],
      validate: {
        validator: (val) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            val
          ),
        message: "{VALUE} is not a valid email address",
      },
    },
    photo: {
      dataUrl: String,
      contentType: String,
      name: String,
    },
    coverPhoto: {
      dataUrl: String,
      contentType: String,
      name: String,
    },
    phone: {
      type: Number,
      validate: {
        validator: (val) => String(val).length >= 6 && String(val).length <= 11,
        message: "Phone number must be between 6 to 11 integers long",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [8, "Password must be eight characters long"],
      maxLength: [16, "Password must not be more than sixteen characters"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords do not match",
      },
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    role: {
      type: String,
      default: USER,
      enum: {
        values: [USER, ADMIN],
        message: `Users may only have one of these roles ['${USER}', '${ADMIN}']`,
      },
    },
    slug: {
      type: String,
      default: function () {
        return setSlug(this);
      },
    },
    fullName: {
      type: String,
      default: function () {
        return this.surName
          ? this.firstName + " " + this.surName
          : this.firstName;
      },
    },
    bio: String,

    work: [
      {
        active: {
          type: Boolean,
          detault: true,
          enum: {
            values: [true, false],
            message: "active can only be true of false",
          },
        },
        text: {
          type: String,
          required: [true, "must provide text for work"],
        },
        current: {
          type: Boolean,
          default: true,
        },
      },
    ],
    education: [
      {
        active: {
          type: Boolean,
          detault: true,
          enum: {
            values: [true, false],
            message: "active can only be true of false",
          },
        },
        text: {
          type: String,
          required: [true, "must provide text for education"],
        },
        current: {
          type: Boolean,
          default: true,
        },
      },
    ],
    currentCity: String,
    homeTown: String,
    relationShipStatus: {
      type: String,
      default: SINGLE,
      enum: {
        values: [
          SINGLE,
          IN_A_RELATIONSHIP,
          ENGAGED,
          MARRIED,
          COMPLICATED,
          SEPARATED,
          DIVORCED,
        ],
        message: `relationShipStatus must be one of these values ['${SINGLE}', '${IN_A_RELATIONSHIP}', '${ENGAGED}', '${MARRIED}', '${COMPLICATED}', '${SEPARATED}', '${DIVORCED}']`,
      },
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

// unique fields error
UserSchema.plugin(uniqueValidator, {
  message: "User with same {PATH} already exists",
});

// user posts
UserSchema.virtual("posts", {
  ref: "post",
  foreignField: "user",
  localField: "_id",
});

UserSchema.virtual("friends", {
  ref: "friend",
  foreignField: "requester",
  localField: "_id",
});

// encrypt password before saving user
UserSchema.pre("save", async function (next) {
  try {
    // only prceed if password is modified or is new
    if (!this.isModified("password")) return next();

    // generate salt
    const salt = await bcrypt.genSalt(12);

    // hash the password
    this.password = await bcrypt.hash(this.password, salt);

    // update passwordChangedAt value
    this.passwordChangedAt = Date.now() - 2000;

    // remove confirmPassword field
    this.confirmPassword = undefined;
    return next();
  } catch (error) {
    return next(error);
  }
});

// instance method to compare password
UserSchema.methods.comparePassword = async function (password) {
  const passwordsMatch = await bcrypt.compare(password, this.password);
  return passwordsMatch;
};

const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;
