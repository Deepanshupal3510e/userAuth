
import nodemailer from "nodemailer";
import { forgotPasswordtemplage } from "../tamplates/forgotPassword.js";
import { verifyEmailTemplate } from "../tamplates/verifyEmailTemplate.js";

export const sendVerifyemailOtp = async (name , email , otp) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port: 465,
        auth: {
          user: "developer.deeps@gmail.com",
          pass: "helm tynx uwws eerg",
        },
      });
      
      const reciever = {
        from : "developer.deeps@gmail.com",
        to : email,
        subject : "OTP for verification",
        html : verifyEmailTemplate(name , email , otp)
      }


      transporter.sendMail(reciever , (error , info) => {
            if(error){
                console.log(error);
            }else{
                console.log("Email sent successfully" , info.response);
            }
      })
}
