const { ADMIN, USER } = require("../../../utils/server/variables");
const uniqueValidator = require("mongoose-unique-validator");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')      
 
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your firstName"],
  },
  surName: {
    type: String,
  }, 
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
  photo: String,
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
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) { return val === this.password },
      message: "Passwords do not match",
    },
    select: false
  },
  passwordChangedAt: {
    type: Date,
    select: false
  },
  role: {
    type: String,
    default: USER,
    enum: {
      values: [USER, ADMIN],
      message: `Users may only have one of these roles ['${USER}', '${ADMIN}']`,
    },
  }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

// unique fields error
UserSchema.plugin(uniqueValidator, {
  message: 'User with same {PATH} already exists'
})

// virtual fullName 
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName}${this.surName ? ` ${this.surName}`: ''}`
})

// encrypt password before saving user 
UserSchema.pre('save', async function (next) {
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
    return next(error)
  }
})

// instance method to compare password
UserSchema.methods.comparePassword = async function (password) {
  const passwordsMatch = await bcrypt.compare(password, this.password);
  return passwordsMatch;
}

const User = mongoose.model("user", UserSchema); 

module.exports = User;           