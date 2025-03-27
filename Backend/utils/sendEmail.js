
import nodemailer from "nodemailer";
import { forgotPasswordtemplage } from "../tamplates/forgotPassword.js";

export const sendEmail = async (name , email , otp) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port: 465, // true for port 465, false for other ports
        auth: {
          user: "developer.deeps@gmail.com",
          pass: "helm tynx uwws eerg",
        },
      });
      6
      const reciever = {
        from : "developer.deeps@gmail.com",
        to : email,
        subject : "OTP for verification",
        html : forgotPasswordtemplage(name , otp)
      }


      transporter.sendMail(reciever , (error , info) => {
            if(error){
                console.log(error);``
            }else{
                console.log("Email sent successfully" , info.response);
            }
      })
}
