const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
    sectionName: {
        type:String,
    },
    subSection: [{
        type: mongoose.Types.ObjectId,
        ref: "SubSection",
        required:true,
    }]
})

module.exports = mongoose.model("Section", sectionSchema);