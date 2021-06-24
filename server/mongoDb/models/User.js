const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a username']
    } 
})



const User = new mongoose.model('user', UserSchema);

export default User;