const SubSection = require("../model/SubSection");
const Section = require("../model/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create subsection
exports.createSubSection = async (req, res) => {
    try {
        //fetch data
        const { title, description, sectionId, timeDuration } = req.body;
        //extract video/file
        const video = req.files.videoFile;
        //validate data
        if (!sectionId || !title || !description || !timeDuration || !video) {
            return res.status(201).json({
                success: false,
                message: "All fields are required",
            })
        }
        //video/file upload to coludinary this will return secure url
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
        //create subsection
        const newSubSection = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url,
        })
        //push subsection id in section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: newSubSection._id,
                }
            },
            {
                new: true
            },
        ).populate("subSection");
        //return res
        return res.status(201).json({
            success: true,
            message: "Subsection created successfully",
            updatedSection,
            newSubSection
        })
    } catch (error) {
        console.log("error occured while creating subSection: ", error)
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }
}

//update subSection
exports.updateSubSection = async (req, res) => {
    try {
        //fetch data
        const { title, description, subSectionId, timeDuration } = req.body;
        //extract video/file
        const video = req.files.videoFile;

        //validate data
        if (!subSectionId || !title || !description || !timeDuration || !video) {
            return res.status(201).json({
                success: false,
                message: "All fields are required",
            })
        }
        //video/file upload to coludinary this will return secure url
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
        //entry find db & update data in db
        const subSection = await SubSection.findByIdAndUpdate({ _id: subSectionId }, {
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url,
        }, { new: true });
        // return res
        return res.status(201).json({
            success: true,
            message: "SubSection updated Successfully",
        })
    } catch (error) {
        console.log("error occured while updating SubSection: ", error)
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }
}

// delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        //get id: assume that we are receiving id in params
        const { subSectionId, sectionId } = req.body;

        await SubSection.findByIdAndDelete({ _id: subSectionId });
        ///TODO: DO we need to delete the entry in section Schema??
        await Section.findByIdAndUpdate({ _id: sectionId }, {
            $pull: {
                subSection: subSectionId,
            }
        }, { new: true });
        // return res
        return res.status(201).json({
            success: true,
            message: "SubSection deleted Successfully",
        })
    } catch (error) {
        console.log("error occured while delete SubSection: ", error)
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }

}