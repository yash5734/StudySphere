const RatingAndReview = require("../model/RatingAndReview");
const Course = require("../model/Course");
const { default: mongoose } = require("mongoose");


// create rating and review
exports.createRating = async (req, res) => {
    try {
        //fetch courseid, userid, review, rating
        const { courseID, review, rating } = req.body
        const userID = req.user.id;

        //validate
        if (!courseID || !userID || !review || !rating) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            })
        }

        //check user belong to that course 
        const courseDetails = await Course.findOne({
            _id: courseID,
            studentsEnrolled: { $elemMatch: { $eq: userID } }
        });

        if (!courseDetails) {
            return res.status(401).json({
                success: false,
                message: "Student does not exists to the course, do not review it",
            })
        }
        //check user is already done a review or not
        const alreadyReview = await RatingAndReview.findOne({ user: userID, course: courseID });
        if (alreadyReview) {
            return res.status(301).json({
                success: false,
                message: "User is already reviewed",
            })
        }

        // creating review and rating

        const ratingReview = await RatingAndReview.create(
            {
                user: userID,
                course: courseID,
                rating: rating,
                review: review,
            }
        )

        //update rating and review to that course
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseID },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            }
            , { new: true });
        console.log(updatedCourseDetails);

        //return response
        return res.status(201).json({
            success: true,
            message: "Rating and Review is Successfully submitted",
            ratingReview,
        })
    } catch (error) {
        console.log("error occured in rating and review section", error);
        return res.status(501).json({
            success: false,
            message: error.message,
        })

    }
}


// get average rating
exports.getAverageRating = async (req, res) => {
    try {
        const courseId = req.body.courseId;

        //calculate avg rating
        const result = await RatingAndReview.aggregate[
            { $match: { course: new mongoose.Types.ObjectId(courseId) } },
            { $group: { _id: null, averageRating: { $avg: "$rating" } } }
        ];

        if (result.length > 0) {
            return res.status(201).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }
        return res.status(201).json({
            success: true,
            message: "No Rating is given to that product",
            averageRating: 0,
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}


// get All Rating

exports.getAllRating = async (req, res) => {
    try {
        const allReview = await ratingAndReviews.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: { courseName },
            })
            .exec();
        return res.status(201).json({
            success: true,
            message: "all review fetched successfully",
            data: allReview,
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}


