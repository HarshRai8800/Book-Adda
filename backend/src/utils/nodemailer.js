import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({})
console.log(process.env.APP_PASSWORD,process.env.EMAIL_HOST)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "harshrai8800@gmail.com",
    pass: "ytrkvejiydmmncpc",
  },
})



async function SendMail(to, otp) {
   try {
     const info = await transporter.sendMail({
       from: process.env.EMAIL_HOST, 
       to: to,
       subject: "Your OTP Code",
       text: `Your OTP is ${otp}. Please use this code to verify your account.`, 
       html: `
         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px; max-width: 400px; margin: auto; text-align: center;">
           <h2>Your OTP Code</h2>
           <p>Use the code below to verify your account:</p>
           <p style="font-size: 24px; font-weight: bold; margin: 20px 0;">${otp}</p>
           <p>This code is valid for 10 minutes.</p>
           <p style="font-size: 12px; color: #888;">If you didn’t request this, please ignore this email.</p>
         </div>
       `,
      
     })
     console.log("email sent succesfully")
     return true
   } catch (error) {
    console.log(error)
    return false
   }



  
   
  }
  
  async function SendOrderMail(to, subject, message) {
  try {
      return await transporter.sendMail({
        from: process.env.EMAIL_HOST,
        to: to,
        subject: subject,
        text: message,
      });
  } catch (error) {
    console.log(error)
    return false
  }
  } 

  export{
    SendMail,
    SendOrderMail
  }