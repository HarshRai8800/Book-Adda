import asynchandler from "../utils/Asynchandler.js";
import { User } from "../models/user.schema.js";
import { UserAuthorization } from "../middlewares/auth.middleware.js";
import GenerateOtp from "../utils/generateOtp.js";
import { SendMail } from "../utils/nodemailer.js";
import { string } from "zod";
import { deleteImage,uploadImage } from "../utils/cloudinary.js";
import {Books}  from "../models/books.schema.js"
 async function generateToken(_id){
 
try {
    const user =await User.findById(_id)
    
    const acess =await user.generateAcessToken()
    const refresh =await user.generateRefreshToken()
    console.log(acess,refresh)
    user.refreshToken=refresh
    await user.save({validateBeforeSave:false})
    
    return{acess,refresh}
    
} catch (error) {
    console.error(error)
}

}


const Get_All_Books = async(req,res)=>{
    try {
        let page=1;
        console.log(req.headers)
  if(req.headers.page<1){
    page=1
  }else{
    page=req.headers.page
  }
  console.log(page)
      const find = await Books.find({}).limit(4).skip(4*page).sort({createdAt:-1})
      console.log(find)
      if(find.length==0){
  return res.status(200).json({
      msg:"books cannot be fetched",
      find
  })    }
  
  return res.status(200).json({
      success :true,
      find
  
  })
    } catch (error) {
     
      
  return res.status(500).json({
     success :false,
     msg:"error occured while data call"
 
 })
    }
 
 
 }

const SigupController= async(req,res)=>{

const {username,email,password,phonenumber,adress} = req.body


try {
    const exists = await User.findOne({email})
    if(exists)return res.status(411).json({msg:"error email alrady exists"})
    
       
    const otp = GenerateOtp()
    const user =await User.create({
        username,
        email,
        password,
        phonenumber,
        adress,
        
        // refreshToken:refresh,
        OtpMail:otp
    })
   const mail= await SendMail(email,otp)
   if(!mail)return res.status(400).json({
    msg:"emasil not send"
   })
    const options = {
        httpOnly:true,
        secure:true
    }
    await user.save()
     const {acess,refresh} =await generateToken(user._id)
    
    console.log(user)

    if(!user) return res.
    status(500).
    json({
        msg:"user not created error in data sent"
    })
    else{
        return res.status(200).
        cookie("accessToken",String(acess),options).
        cookie("refreshToken",String(refresh),options).
        json({
            msg:"user created successfully",
            user
        })
    }
} catch (error) {
    console.log(error)
    return res.status(500).json({
        msg:"something went wrong while creating the user",
       
})
}








// if(refresh&& acess){
//     res.status(200).json({
//         msg:"user created"
//     })
// }else{
//     res.send({
//         msg:err
        
//     })
// }


}

const CHANGE_AVATAR = async(req,res)=>{
    try {
    const user = req.user    
    console.log(user)
    const data = User.findById(user._id)
   
    await deleteImage(data.avatar)
    console.log(req.files.avatar[0].path)
    const avatar = await uploadImage(req.files.avatar[0].path)
    console.log(avatar+"116")
const change =await User.findByIdAndUpdate(user._id,{
    avatar:avatar
})
change.save()
console.log(change)
if(change){
   return res.status(200).json({
        msg:"done",
        change
    })
}else{
return  res.status(400).json({
    msg:"error"
})
}
    } catch (error) {
        console.log(error)
      return  res.status(400).json({
            msg:"error ",

        })
    }
}
const LoginController = async(req,res)=>{
    const {email,password}= req.body
    const user = await User.findOne({
        email
    })

if(!user){
    return res.status(400).json({
        msg:"user dosent exist or signedup"
    })
}

const check = await user.checkPassword(password)

if(!check){
    return res.status(400).json({
        msg:" password enterd is incorrect"
    })
}

const {acess,refresh} =await generateToken(user._id)

const options = {
    httpOnly:true,
    secure:process.env.PRODUCTION_COOKIES==="production"
}
console.log(acess)
if(refresh&& acess){
 return   res.
 status(200).
 cookie("accessToken",String(acess),options).
 cookie("refreshToken",String(refresh),options).
 json({
        msg:"user logged in successfully",
        user
    })
}else{
   return res.status(400).json({
        msg:"login failed"
        
    })
}


}

const Get_User_Information = async(req,res)=>{
    console.log(req.user)
const token = req.user._id
if(!token){
    return res.status(400).json({
        msg:"access denied"
    })
}

const user = await User.findById(token).select("-password -deleted -refreshToken")

if(!user)  return res.status(400).json({
    msg:"user not found"
})

   return res.status(200).json({
    success:true,
    user
})


}

const update_User_Information = async (req,res)=>{
    const token = req.user._id
    if(!token){
        return res.status(400).json({
            msg:"access denied"
        })
    }
    const {adress,username}=req.body
    const user = await User.findByIdAndUpdate(token,{
username:username,
adress:adress
    }).select("-password -deleted -refreshToken")
    
    if(!user)  return res.status(400).json({
        msg:"user not found"
    }) 

return res.status(200).json({
    msg:"user updated successfullly",
    user
})
}

const USER_INFORMATION = async(req,res)=>{

const id = req.user._id

try {
    const data = await User.findById(id).populate("history")
    console.log(data)
    return res.status(200).json({
        msg:"completed",
        data
    })
   
} catch (error) {
    console.log(error)
}


}


const USER_INFORMATION2 = async(req,res)=>{

    const id = req.user._id
    
    try {
        const data = await User.findById(id).populate("soldHistory")
        console.log(data)
        return res.status(200).json({
            msg:"completed",
            data
        })
       
    } catch (error) {
        console.log(error)
    }
    
    
    }

const USER_INFORMATION3=async(req,res)=>{

    const id = req.user._id
    
    try {
        const data = await User.findById(id).populate("listed")
        console.log(data)
        return res.status(200).json({
            msg:"completed",
            data
        })
       
    } catch (error) {
        console.log(error)
    }

}


export {
    SigupController,
    LoginController,
    Get_User_Information,
    update_User_Information,
    CHANGE_AVATAR,
    Get_All_Books,
    USER_INFORMATION,
    USER_INFORMATION2,
    USER_INFORMATION3
}