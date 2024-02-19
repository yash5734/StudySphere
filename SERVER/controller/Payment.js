const User = require("../model/User");
const Course = require("../model/Course");
const { instance } = require("../config/razorpay");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const mailSender = require("../utils/mailSender")

//capture payment and inititate razzorpay order

exports.capturePayment = async (req, res) => {
    // user id and course id fetch
    const { courseID } = req.body;
    const userID = req.user.id;

    //validate course id and user id
    if (!courseID) {
        return res.status(401).json({
            success: false,
            message: "courseID are required",
        })
    }

    let course;
    try {
        course = await Course.findById({ courseID });
        if (!course) {
            return res.status(401).json({
                success: false,
                message: "Course ID is wrong",
            })
        }
        // check user already pay for the course
        const uid = new mongoose.Types.ObjectId(userID); // convert userid string to object id;
        if (course.studentsEnrolled.include(uid)) {
            return res.status(301).json({
                success: false,
                message: "user is already registered for this code",
            })
        }
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }

    //order create

    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            userID,
            courseID,
        }
    }

    // create order

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse)
        return res.status(201).json({
            success: true,
            orderId: paymentResponse.id,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }
}

// verify signature of razorpay and server

exports.verifyPayment = async (req, res) => {

    const webHookSecret = "1234567890";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webHookSecret);

    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature == digest) {
        console.log("payment is authorised");

        const { courseID, userID } = req.body.payload.payment.entity.notes;

        try {
            // fullfill the action-> enrolll the student to the course
            const enrolledCourse = await Course.findOneAndUpdate({ _id: courseID },
                { $push: { studentsEnrolled: userID } },
                { new: true });

            if (!enrolledCourse) {
                return res.status(402).json({
                    success: false,
                    message: "Course not found"
                })
            }
            console.log(enrolledCourse);

            // enroll the course to the user i.e. student

            const enrolledUser = await User.findOneAndUpdate({ _id: userID },
                { $push: { courses: courseID } },
                { new: true });

            if (!enrolledUser) {
                return res.status(402).json({
                    success: false,
                    message: "User not found"
                })
            }
            console.log(enrolledUser);

            // send email to user for course enrolled

            const mailResponse = await mailSender(enrolledUser.email, "Congratualtions! Your are now enrolled in new course", "Your are now enrolled in new course");

            console.log(mailResponse);

            return res.status(201).json({
                success: true,
                message: "Signature verified and Course added",
            })

        } catch (error) {
            return res.status(501).json({
                success: true,
                message: error.message
            })
        }

    } else {
        return res.status(402).json({
            success: false,
            message: "Signature not verified",
        })
    }


}