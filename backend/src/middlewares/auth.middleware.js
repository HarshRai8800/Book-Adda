import becypt from "bcrypt"

import jwt from "jsonwebtoken"
import { User } from "../models/user.schema.js"
import { Admin } from "../models/admin.schema.js"

const UserAuthorization = async(req,res,next)=>{
try {

    const token = req.cookies.accessToken
   
    if(!token){
    return res.status(400).json({
        msg:"something went wrong"
    })
    }
    
    const credentials = jwt.verify(token,process.env.JWT_PRIVATE_KEY)
    const user = await User.findOne({ email: credentials?.email }).select("-password -deleted -refreshtoken")

    if(!user) return res.status(400).json({msg:"something went wrong in authentication"})
        req.user = user
    next()
} catch (error) {
   
    console.log("ewrror in authentication")
   return res.status(500)
}

}

const AdminAuthorization = async(req,res,next)=>{
    try {

        const token = req.cookies?.accessTokenAdmin||req.headers.authorization.split(" ")[1]
        
        if(!token){
        return res.status(400).json({
            msg:"something went wrong"
        })
        }
        const credentials = jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        
        const admin = await Admin.findOne({email:credentials?.email}).select("-password-refreshToken-delete")
        if(!admin) return res.status(400).json({msg:"something went wrong in authentication"})
            req.Admin = admin
        next()
    } catch (error) {
        console.log("ewrror in authentication"+error)
       return res.status(500)
    }
    
}

export {
    UserAuthorization,
    AdminAuthorization
}