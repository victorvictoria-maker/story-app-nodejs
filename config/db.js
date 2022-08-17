const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
            // retryWrites: true,
            // w: "majority",
        });

        console.log(`MONGODB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    };
};

module.exports = connectDB;