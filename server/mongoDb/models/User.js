const { ADMIN, DARK, LIGHT, USER } = require("../../utils/variables");
const uniqueValidator = require("mongoose-unique-validator");

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your firstName"],
  },
  surName: {
    type: String,
  },
  fullName: {
    type: String,
    default: this.firstName + this.surName,
  },
  email: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    required: [true, "Please provide your email address"],
    validation: {
      validator: (val) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          val
        ),
      message: "{VALUE} is not a valid email address",
    },
  },
  photo: String,
  phone: {
    type: Number,
    validation: {
      validator: (val) => val >= 6 && val <= 11,
      message: "Phone number must be between 6 to 11 integers long",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "Password must be eight characters long"],
    maxLength: [16, "Password must not be more than sixteen characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validation: {
      validator: (val) => val === this.password,
      message: "Passwords do not match",
    },
  },
  role: {
    type: String,
    default: USER,
    enum: {
      values: [USER, ADMIN],
      message: `Users may only have one of these roles ['${USER}', '${ADMIN}']`,
    },
  },
  preferredTheme: {
    type: String,
    default: LIGHT,
    enum: {
      values: [LIGHT, DARK],
      message: `preferred theme may only be one of these modes ['${LIGHT}', '${DARK}']`,
    },
  },
});

// unique fields error
UserSchema.plugin(uniqueValidator, {
    message: 'User with same email already exists'
})


const User = mongoose.model('user', UserSchema);

module.exports = User;