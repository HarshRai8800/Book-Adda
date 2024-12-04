import  { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const userModel = new Schema({
username:{
    type:String,
    unique:true,
    required:true,
    index:true,
    trim:true
},
email:{
    type:String,
    unique:true,
    required:true,
    index:true,
    trim:true
},
password:{
    type:String,
    required:true
},
adress:{
    type:String,
    maxLength:255,
    required:true
},
phonenumber:{
    type:Number,
    length:10,
    required:true,
    unique:true
},
avatar:{
    type:String,
    default:""
},
favourites:[
    {
    type:Schema.Types.ObjectId,
    ref:"Books",
    
}
],
cart:[
    {
type:Schema.Types.ObjectId,
ref:"Books"
}
],
verified:{
type:String,
default:false
},
OtpMail:{
    type:Number,
    default:0
},
OtpNum:{
    type:Number,
    default:0
},
order:[
{type:Schema.Types.ObjectId,
ref:"Orders"}
],
history:
[
    {type:Schema.Types.ObjectId,
    ref:"Books"}
],
listed:
    [
        {type:Schema.Types.ObjectId,
        ref:"Books"
    }
    ],
soldHistory:[{
    type:Schema.Types.ObjectId,
    ref:"Books"
}]
,
refreshToken:
    {
        type:String
    },
    deleted:{
        type:String,
        default:false,
        index:true

    }


},
{
  
    timestamps:true
},)

userModel.pre("save",async function(next){
if(!this.isModified("password")) return next()

    this.password=await bcrypt.hash(this.password,10)
    next()


})

userModel.methods.checkPassword=async function(password){
try {
     await bcrypt.compare(password,this.password,(err,data)=>{
        
        
        console.log(data )
        if(data!=true)console.error(err)
           
}

)

return true
}catch(err){
console.log(err)
}

}

userModel.methods.generateAcessToken=async function(){
    console.log( process.env.JWT_PRIVATE_KEY,process.env.ACCESS_TOKEN_EXPIRY)
return jwt.
  sign({
  _id:this._id,
  username:this.username,
  email:this.email,
  password:this.password  

  },
  process.env.JWT_PRIVATE_KEY,
  {
    expiresIn:"10d"
  }
  
)

}

userModel.methods.generateRefreshToken=async function(){
    return jwt.
      sign({
      _id:this._id,
     
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn:"1d"
      }
    )
    
    }


export const User = mongoose.model("User",userModel)

