const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
        .then(() => console.log("MongoDb Connected Successfully"))
        .catch((error) => {
            console.log("MongoDb Connection Failed");
            console.error(error);
            process.exit(1);
        })
}