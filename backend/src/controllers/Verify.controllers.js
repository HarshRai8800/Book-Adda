import { User } from "../models/user.schema.js";
import GenerateOtp from "../utils/generateOtp.js"; 
import { SendMail } from "../utils/nodemailer.js";

async function Check_Otp_Mail(req,res) {
    const {otp} = req.body
const email = req.user.email
console.log(email+"567788")
const user = await User.findOne({email})
if(!user){
    return res.status(400).json({
        msg:"something went wrong"
    })
}
console.log(user.OtpMail,otp)
if(otp==user.OtpMail){
    await User.findOneAndUpdate({email},{
        verified:true
    })
    return res.status(200).json({
        msg:"otp verification successfull"
    })

}
return res.status(400).json({
    msg:"otp sent is wrong"
})

    
}



async function Resend_Otp_Mail (req,res){

const {email} = req.user
const otp = GenerateOtp()
console.log(otp)
const user = await User.findOneAndUpdate({email},{
    OtpMail:otp
})
if(!user){
    return res.status(400).json({
        msg:"something went wrong"
    })
}
await SendMail(email,otp)
return res.status(200).json({
    msg:"otp send successfully"
})
}
export {
    Resend_Otp_Mail,
    Check_Otp_Mail
}

