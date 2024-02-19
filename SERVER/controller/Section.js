const Section = require("../model/Section");
const Course = require("../model/Course");

exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;
        //validate
        if (!sectionName || !courseId) {
            return res.status(201).json({
                success: false,
                message: "All fields are required",
            })
        }
        //section create
        const newSection = await Section.create({ sectionName });
        //course me entry ki
        await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    courseContent: newSection._id,
                }
            }, { new: true }).populate("courseContent").exec();
        //return response
        return res.status(201).json({
            success: true,
            message: "Successfully section created",
        })
    } catch (error) {
        console.log("error occured while creating Section: ", error)
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }
}

//update section
exports.updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, sectionID } = req.body;
        //validate data
        if (!sectionName || !sectionID) {
            return res.status(201).json({
                success: false,
                message: "All fields are required",
            })
        }
        //entry find db & update data in db
        const section = await Section.findByIdAndUpdate({ _id: sectionID }, { sectionName: sectionName }, { new: true });
        // return res
        return res.status(201).json({
            success: true,
            message: "Section updated Successfully",
        }) 
    } catch (error) {
        console.log("error occured while updating Section: ", error)
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }

}
// delete Section
exports.deleteSection = async (req, res) => {
    try {
        //get id: assume that we are receiving id in params
        const { sectionID } = req.params;
        
        await Section.findByIdAndDelete({ _id: sectionID });
        ///TODO: DO we need to delete the entry in course Schema??
        // return res
        return res.status(201).json({
            success: true,
            message: "Section deleted Successfully",
        }) 
    } catch (error) {
        console.log("error occured while delete Section: ", error)
        return res.status(501).json({
            success: false,
            message: error.message,
        })
    }

}