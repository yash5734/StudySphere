const User = require("../model/User");
const OTP = require("../model/OTP");
const Profile = require("../model/Profile");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
// const otpGenerator = require("otp-generator");

require("dotenv").config();

exports.sendOtp = async (req, res) => {
    try {
        //1st STEP => fetching... eamil from req.body
        const { email } = req.body;

        //check if user already present..
        const checkUserPresent = await User.findOne({ email });
        //if user is already present
        if (checkUserPresent) {
            return res.status(401).json({
                sucess: false,
                message: "User Already Exists",
            })
        }

        //genearating... otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP GENERATED => ", otp);

        //checking... uniqueness of the oTP
        // let result = await OTP.findOne({otp: otp});

        // while(result){
        //     otp = otpGenerator.generate(6, { //CHECK THIS IF ERROR OCURR 
        //         upperCaseAlphabets:false,
        //         lowerCaseAlphabets:false,
        //         specialChars:false,
        //     });

        //     result = await OTP.findOne({otp: otp});
        // }

        const result = await OTP.findOne({ otp });
        // console.log("Result is Generate OTP Func");
        console.log("--------------OTP-------------", otp);
        console.log("Result", result);
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }

        //creating... otpPayload
        const otpPayload = { email, otp };
        //creating... an entry in Database for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log("otpBODY -> ", otpBody);

        //sending...final response
        res.status(200).json({
            success: true,
            message: "OTP Sended SUCCESSFULLY !!",
            otp: otp,
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}
// signup

exports.signUp = async (req, res) => {
    try {
        // Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;
        // Check if All Details are there or not
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not match. Please try again.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        // const response = await OTP.find({ email }).sort({ createdAt: -1 });
        console.log(response);
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP you entered is wrong !!",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};

//login
exports.login = async (req, res) => {
    try{
        //fetching... data
        const{
            email,
            password,
        } = req.body;

        //validating... data
        if( !email || !password ){
            return res.status(403).json({
                success:false,
                message:"ALL FIELDS ARE REQUIRED",
            });
        }

        //checking... user existence
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not registered !!",
            });
        }

        //matching... password && //generating... JWT token
        if(await bcrypt.compare(password, user.password)) {
            //creating.. payload
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType,
            }
            //generating... jwt token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                // expiresIn:"24h",
                // expiresIn:"365d" 
            });
            user.token = token;
            user.password = undefined;

            //creating... cookie && //sending...  final RESPONSE 
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"LOGGED IN SUCCESSFULLY",
            });
        
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password doesnt matched !!",
            });
        }

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user cannot LOGGED in, try again ",
        }) 
    }
} 


exports.changePassword = async (req, res) => {
    try {
        // fetch details;
        const { newPassword, oldPassword, } = req.body;
        const userId = req.user.id;

        if ( !newPassword || !oldPassword || !userId) {
            return res.status(501).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check user exits
        const user = await User.findById({ _id:userId});

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not exists, Please register youself",
            })
        }

        // check old password
        if (!(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Your previous password is incorrect",
            })
        }

        

        // hashed new password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // update new password
        user.password = newHashedPassword;
        await user.save();

        // send email for password changed
        try {
            const mailResponse = await mailSender(user.email, "Update Password", passwordUpdated(user.email, user.firstName));
            console.log("email of changing password is sent", mailResponse);
        } catch (error) {
            console.log("error occured while sending mail for changing password", error);
        }


        return res.status(201).json({
            success: true,
            message: "User passord has changed",
        })
    } catch (error) {
        console.log("error occured while changing password", error);
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }

}