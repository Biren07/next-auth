import bcryptjs from "bcryptjs"
import User from "@/models/userModel"
import nodemailer from "nodemailer"


export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
        // create a hashed token 
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType==='VERIFY'){
            await User.findOneAndUpdate(userId,{
                verifyToken:hashedToken,veerifyTokenExpiry:Date.now()+3600000})
            }
            else if(emailType==='RESET'){
                await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken, forgetPasswordTokenExpiry:Date.now()+3600000})
            }
        let transport= nodemailer.createTransport({

            host:"sandbox.stmp.mailtrap.io",
            port:2525,
            auth:{
                user: "3fd364695517df",
                pass: "7383d58fd399cf"
            }
        });

          const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
         const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}