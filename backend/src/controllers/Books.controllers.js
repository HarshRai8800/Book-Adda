import { User } from "../models/user.schema.js";
import { Books } from "../models/books.schema.js";
import { Schema } from "zod";

import {uploadImage} from "../utils/cloudinary.js"

const List_Book = async(req,res)=>{
    const token = req.user._id 

if(!token){
    return res.status(400).json({
        msg:"proccess failed"
    })
}
const user = await User.findById(token)
if(!user) return res.status(400).json({
    msg:"user dose not exist"
})
console.log(req.files)
const file = req.files.avatar[0].path
if(!file){
    return res.status(400).json({
        msg:"file path not found"
        })
}
const url = await uploadImage(file)
if(!url){
    return res.status(400).json({
        msg:"url not found"
        })
}



const {title,description,price,quality} = req.body
const find = await Books.findOne({owner:token,title:title})
if(find){
    return res.status(400).json({
        msg:"duplicate book sent "
    })
}
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



const Update_Book_User = async (req,res)=>{
try {
    const token = req.user._id
    if(!token)return res.status(400).json({msg:"error user not found"})
    
    const admin = await User.findById(token)
    if(!admin)return res.status(400).json({
        msg:"error hai bro admin not found "
    })
    const file = req.files.avatar[0].path
    const url = await uploadImage(file)
    if(!url){
        return res.status(400).json({
            msg:"url not found"
            })
    }
    
    
    const id = req.headers.id
    const {title,description,price,quality} = req.body
    const books = await Books.findByIdAndUpdate(id,{
    title,
    description,
    price,
    quality,
    ImageUrl:url
    })
    if(!books){
        return res.status(400).json({msg:"Books updated not possible"})}
        
    return res.status(200).json({msg:"Books updated"})
} catch (error) {
    console.log(error)
    return res.status(400).json({msg:"error has occured while updating books"})
}

}



export{
    List_Book,
    Update_Book_User

}
 
 
 