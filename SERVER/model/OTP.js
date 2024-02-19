const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

const OtpSchema = mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    otp: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }
})

async function sendVerificationEmail(email,otp) {
    try {
        const response = await mailSender(email, "Verification Code",  emailTemplate(otp)); 
        console.log("email sent successfully:", response);
    } catch (error) {
        console.log("error occured while sending otp: ", error);
    }
}

OtpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OtpSchema);