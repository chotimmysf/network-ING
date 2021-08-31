const Mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await Mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('Mongo DB has connected successfully.')
    } catch (err) {
        console.error(err.message);
        // Exit process with automatic failure
        process.exit(1);
    }
}

module.exports = connectDB;