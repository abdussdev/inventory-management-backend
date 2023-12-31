const OTPSModel = require("../../models/user/OTPSModel")
const transporter = require("../../utils/EmailTransporter");

const UserVerifyEmailService = async (Request, DataModel) => {
    try {
        let email = Request.params.email
        let OTPCode = Math.floor(100000 + Math.random() * 900000);

        let userCount = (await DataModel.aggregate([{ $match: { email: email } }, { $count: "count" }]))

        // Email data
        const mailOptions = {
            from: "Abdus Samad <abdusjscript@gmail.com>",
            to: email,
            subject: "OTP Verification",
            text: `Your OTP (One-Time Password) for verification is: ${OTPCode}`,
        };

        if (userCount.length > 0) {
            //otp insert
            await OTPSModel.create({ email: email, otp: OTPCode })

            //otp send
            const SendEmail = await transporter.sendMail(mailOptions);
            return { status: "success", data: SendEmail }
        } else {
            return { status: "fail", data: "No user found" }
        }

    } catch (error) {
        return { status: "fail", data: error.toString() }
    }
}

module.exports = UserVerifyEmailService;