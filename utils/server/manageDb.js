const dotenv = require('dotenv');
const connectDb = require('../../server/mongoDb/connectDb');
const User = require('../../server/mongoDb/models/User');

dotenv.config({ path: `${__dirname}/../../.env.local` });


connectDb().then(async () => {
    try {
        const updatedUsers = await User.collection.updateMany({}, { $unset: { preferredTheme: 1 } });
        console.log('users updated', updatedUsers);
    } catch (error) {
        console.log(error)
    }
})