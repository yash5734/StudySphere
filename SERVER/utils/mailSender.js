const nodeMailer = require("nodemailer");
const mailSender = async (email,title,body)=>{
    try {
        let transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            tls:{
                rejectUnauthorized:false,
            }
        })

        const info = transporter.sendMail({
            from: "ACADEMEASE || BY YASH SINGHAL",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        console.log(info);
        return info;
    } catch(error) {
        console.log(error.message);
    }
}

module.exports = mailSender;