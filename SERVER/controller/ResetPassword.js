const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// reset passowrd token
exports.resetPasswordToken = async (req, res) => {
    
    try {
            // fetch email from req body
        const email = req.body.email;

        //validate and authenticate email,
        if (!email) {
            return res.status(401).json({
                success: false,
                message: "email is not exists",
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Wrong email",
            })
        }
        // generate token,
        const token = crypto.randomBytes(20).toString("hex");

        //add token and expires in user schema
        const updatedUser = await User.findOneAndUpdate({ email }, { token: token, resetPasswordExpires:Date.now()+ 5 * 60 * 1000 }, { new: true });
        // generate url
        const url = `http://localhost:3000/update-password/${token}`;

        // mail send with url
        await mailSender(email, 
            " Reset Ur Password => ",
            `Password Reset Link: ${url}`);
            console.log("token ==>", token);

        // return response
        return res.status(200).json({
            success: true,
            message: "email send with reset url",
        })
    } catch (error) {
        console.log("error occured in reset password ", error);
        return res.status(401).json({
            success: false, 
            message: error.message,
        })
    }
}

//reset password

exports.resetPassword = async (req,res) => {
   try {
            // fetch data from req body   *token is given by frontend with the help of url, bcz url has token
        const { password, confirmPassword, token } = req.body;

        // validation
        if (password != confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Please check the password",
            })
        }

        // fetch user details wth the help of token
        const userDetails = await User.findOne({ token: token });

        // if not valid token then no entry of user details
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Reset Password Link is not Correct",
            })
        }

        // check expiration of the token
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Reset Link is expired",
            })
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update password in db
       await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true });
       
        // return response
        return res.status(201).json({
            success: true,
            message:"Password is Successfully reset",
        })
   } catch (error) {
       console.log("error occured in resetPassword", error);
       return res.status(400).json({
        success: false,
        message: error.message,
    })
   }
}