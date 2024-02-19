const User = require("../model/User");
const Course = require("../model/Course");
const Category = require("../model/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");

// create course

exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, category, tag } = req.body;
        const thumbnail = req.files.thumbnailImage;

        if (!courseName || !courseDescription || !whatYouWillLearn || !category || !price || !thumbnail || !tag) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userID = req.user.id;

        // Check if the user is an instructor
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "Not a valid instructor ID while creating a course",
            });
        }

        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Not a valid category ID while creating a course",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: userID,
            whatYouWillLearn,
            price,
            tag,
            thumbnail: thumbnailImage.secure_url,
            category: categoryDetails._id,
        });

        await User.findByIdAndUpdate(userID, { $push: { courses: newCourse._id } });

        await Category.findByIdAndUpdate(category, { $push: { course: newCourse._id } });

        return res.status(201).json({
            success: true,
            message: "Course is successfully created",
            data: newCourse,
        });
    } catch (error) {
        console.error("Error occurred while creating a course", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// show all courses

exports.getAllCourses = async (req, res) => {
    try {
        // fetch data from db with name and decription
        const allCourses = await Course.find({},
            {
                courseName: true,
                courseDescription: true,
                instructor: true,
                ratingAndReviews: true,
                thumbnail: true,
                studentsEnrolled: true,
            }
        ).populate("instructor").populate("tag").exec();
        // return the data
        return res.status(201).json({
            success: true,
            message: "All Courses Returned Successfully",
            data: allCourses,
        })
    } catch (error) {
        console.log("error occured while showing all the courses", error);
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }
}

// hw - get course details all populated

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetails = await Course.find({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            })
            // .populate({
            //     path: "ratingAndReviews",
            //     populate: {
            //         path: "user",
            //     }
            // })
            .populate("category")
            .populate("studentsEnrolled")
        console.log(courseDetails);

        if (!courseDetails) {
            return res.status(401).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            })
        }
        return res.status(201).json({
            success: true,
            message: "Course details fetch successfully",
            data: courseDetails,
        })


    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const accountType = req.user.accountType;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user id missing in backend"
            })
        }
        if (accountType !== Instructor) {
            return res.status(400).json({
                success: false,
                message: "Invalid account type",
            })
        }

        const instructorCourses = await Course.find({ instructor: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}

exports.getAllCoursesData = async (req, res) => {
    try {
      // const allCourses = await Course.aggregate(
      //   [
          
      //   ]
      // )
      const allCourses = await Course.find({})
      .populate({
        path: 'instructor',
        select: 'firstName lastName image email', // Specify fields to populate from the User model
      })
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
          model: 'SubSection',
        },
        model: 'Section',
      })
      .populate('studentsEnrolled') // Populate the studentsEnrolled array
      .populate('category') // Populate the category 
      .exec()
  
      return res.status(200).json({
        success: true,
        data: allCourses,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Course Data`,
        error: error.message,
      })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }