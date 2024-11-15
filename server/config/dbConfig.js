const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`📌 Mongodb Connected    🌐 :  ${con.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDb;



