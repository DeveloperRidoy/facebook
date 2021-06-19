const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        console.log('db connected');
    } catch (error) {
        console.log('db connection failed...shutting down server');
        process.exit(1);
    }
}


module.exports = connectDb;
 


