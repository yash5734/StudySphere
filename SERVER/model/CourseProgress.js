const mongoose = require("mongoose");

const courseProgress = mongoose.Schema({
    course: [
        {
            type: mongoose.Types.ObjectId,
            ref:"Course",
        }
    ],
    completedVideo: [
        {
            type: mongoose.Types.ObjectId,
            ref:"SubSection", 
        }
    ]
})

module.exports = mongoose.model("CourseProgress", courseProgress);