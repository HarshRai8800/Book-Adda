import {Admin} from "../models/admin.schema.js"
import { Books } from "../models/books.schema.js"
import { upload } from "../middlewares/multer.middleware.js"
import { uploadImage } from "../utils/cloudinary.js"
async function generateToken(_id){
 
    try {
        const user =await Admin.findById(_id)
        
        const acess =await user.generateAcessToken()
        const refresh =await user.generateRefreshToken()
        console.log(acess,refresh+"12")
        await Admin.findByIdAndUpdate(_id,{refreshToken:refresh})
        await user.save({validateBeforeSave:false})
        
        return{acess,refresh}
        
    } catch (error) {
        console.error(error)
    }
    
    }

    

const SigupAdmin = async (req,res)=>{
const {name,email,password}= req.body

const admin = await Admin.findOne({
name,email
})
if(admin)return res.status(400).json({
    msg:"admin alrerady exists"
})
// if(!admin.checkPassword(password))return res.status(400).json({
//     msg:"password sent is incorrect"
// })

const created = await Admin.create({
    name,
    email,
    password,

})
await created.save()
const {acess,refresh}= await generateToken(created._id)
const options={
httpOnly:true,
secure:process.env.PRODUCTION_COOKIES=="production"
}

if(!created)return res.status(400).
json({
    msg:"Admin cannot be created"
})
return  res.status(200).
cookie("accessTokenAdmin",String(acess),options).
cookie("refreshTokenAdmin",String(refresh),options).
json({
    msg:"Admin created succesfully"
})
}

const LoginAdmin = async(req,res)=>{
    const {email,password}= req.body

    const admin = await Admin.findOne({
    email
    })
    console.log(admin)
    if(!admin)return res.status(400).json({
        msg:"admin dose not exists"
   })
if(!admin.checkPassword(password))return res.status(400).json({
    msg:"password sent is incorrect"
})
const {acess,refresh}= await generateToken(admin._id)
const options={
    httpOnly:true,
    secure:process.env.PRODUCTION_COOKIES=="production"
}
return res.status(200).
cookie("accessTokenAdmin",String(acess),options).
cookie("refreshTokenAdmin",String(refresh),options)
.json({
        msg:"admin logged succesfully"
    })






}

const Add_Books = async(req,res)=>{
    const token = req.Admin._id
console.log(token)
if(!token){
    return res.status(400).json({
        msg:"proccess failed"
    })
}
const admin = await Admin.findById(token)
if(!admin) return res.status(400).json({
    msg:"admin dose not exist"
})
console.log(req.files)
const file = req.files?.avatar[0]
console.log(file) 
if(!file){
    return res.status(400).json({
        msg:"file path not found"
        })
}
const url = await uploadImage(file.path)
if(!url){
    return res.status(400).json({
        msg:"url not found"
        })
}
console.log(url)


const {title,description,price,quality} = req.headers
console.log(title,description,price,quality)
const book = await Books.create({
title,
description,
price,
quality,
ImageUrl:url||"",
owner:token
})

book.save()
if(!book)return res.status(400).json({
    msg:"there is an error in book creation"
})
return res.status(200).json({
    msg:"succesfully created",
    book
})

}


const Update_Book = async (req,res)=>{
try {
    const token = req.Admin._id
    if(!token)return res.status(400).json({msg:"error Admin not found"})
    
    const admin = await Admin.findById(token)
    if(!admin)return res.status(400).json({
        msg:"error hai bro admin not found "
    })
    const file = req.files.avatar[0].path
    let url = 0; 
    if(file){
        url = await uploadImage(file)
        if(!url){
            return res.status(400).json({
                msg:"url not found"
                })
        }
    }
   
    
    
    const id = req.headers.id
    const {title,description,price,quality} = req.headers
    const books = await Books.findByIdAndUpdate(id,{
    title,
    description,
    price,
    quality,
    ImageUrl:url
    })
    console.log(books)
    if(!books){
        return res.status(400).json({msg:"Books updated not possible"})}
        
    return res.status(200).json({msg:"Books updated",books})
} catch (error) {
    console.log(error)
    return res.status(400).json({msg:"error has occured while updating books"})
}

}

const Delete_Books = async(req,res)=>{
    try {
        const {id} = req.headers
        const deleted = await Books.findByIdAndDelete(id)
        if(!deleted){
            return res.status(400).json({
                msg:"error file id sent wrong"
            }) }
            return res.status(200).json({
                msg:"file deletd successfully"
            })
            
    } catch (error) {
        console.log(error)
    return res.status(500).json({
        msg:"error in deletetion"
    })
    }

}

const Get_All_Books = async(req,res)=>{
   try {

     const find = await (await Books.find({}).sort({createdAt:-1}))
     if(find.length==0){
 return res.status(400).json({
     msg:"books cannot be fetched"
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

const Get_Recent_Books = async(req,res)=>{
    try {

      const find = await Books.find({}).sort({createdAt:-1}).limit(8)
      if(find.length==0){
  return res.status(400).json({
      msg:"books cannot be fetched"
  })    }
  
  return res.status(200).json({
      success :true,
      find
  
  })
    } catch (error) {
     
      console.log(error)
  return res.status(500).json({
     success :false,
     msg:"error occured while data call"
 
 })
    }
 
 
 }
 
const Get_Book_By_Id = async(req,res)=>{
    try {
      const {id} = req.headers
    
      const find = await Books.findById(id)
      console.log(find)
      if(find.length==0){
  return res.status(400).json({
      msg:"books cannot be fetched"
  })    }
  
  return res.status(200).json({
      success :true,
      find
  
  })
    } catch (error) {
     
      console.log(error)
  return res.status(500).json({
     success :false,
     msg:"error occured while data call"
 ,error
 })
    }
 
 
 }
 


export {
    SigupAdmin,
    LoginAdmin,
    Add_Books,
    Update_Book,
    Get_All_Books,
    Get_Recent_Books,
    Get_Book_By_Id,
    Delete_Books
}



