const mongoose = require('mongoose');

const QuickLoginSchema = new mongoose.Schema({
  logins: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'please provide user as User objectId']
      },
      rememberPassword: {
        type: Boolean,
        default: false,
      },
    }, 
  ],
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}}); 

// pre find middleware 
QuickLoginSchema.pre(/^find/, function () {
  this.populate('logins.user', 'firstName surName photo email')
})

const QuickLogin = mongoose.model('quicklogin', QuickLoginSchema);

module.exports = QuickLogin;