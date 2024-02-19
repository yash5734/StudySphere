const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        trim:true
    },
    course: [
        {
        type: mongoose.Types.ObjectId,
        ref:"Course"
        }
    ]
})

module.exports = mongoose.model("Category", categorySchema);