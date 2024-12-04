import mongoose from "mongoose";
import { Schema } from "mongoose"; 
import becypt from "bcrypt"
import jwt from "jsonwebtoken";
const adminModel =new Schema({
name:{
    type:String,
    required:true,
    enum:["har","hum","bum","chum"]
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:String
},
deleted:{
    type:String,
    default:false,
    index:true
},
refreshToken:{
    type:String,
default:""
}


},{
    timestamps:true
})


adminModel.pre("save",async function (next) { 
    if(!this.password)return next()
this.password =await becypt.hash(this.password,10)
    return next()

})
adminModel.methods.checkPassword=async function(password){
 const res =    await becypt.compare(password,this.password,(err,data)=>{
        if(data) console.log(data)
     
     })
if(res){
    return true
}else return false
    }
    adminModel.methods.generateAcessToken=async function(){
        return await jwt.
          sign({
          _id:this._id,
          username:this.username,
          email:this.email,
          password:this.password  
        
          },
          process.env.JWT_PRIVATE_KEY,
         {
            expiresIn:"1d"
         }
        )
        
        }
        adminModel.methods.generateRefreshToken=async function(){
            const token = await jwt.
              sign({
              _id:this._id,
              
            
              },
              process.env.JWT_PRIVATE_KEY,
            {
                expiresIn:"10d"
            }
            )
            console.log(token+79)
            return token
            }


export const Admin = mongoose.model("Admin",adminModel)