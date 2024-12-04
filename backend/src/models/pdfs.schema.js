import mongoose from "mongoose";
import { Schema } from "mongoose";

const pdfsModel = new Schema({
    title:{
        type:String,
        required:true ,
        upperCase:true,
        index:true
    },
    description:{
        type:String,
        required:true,
        maxLength:500
    },
    ImageUrl:{
        type:String,
        required:true
    },
  ContentUrl:{
    type:String,
    required:true
  }  ,
  
    owner:{
        type:Schema.Types.ObjectId,
        ref:"Admin",
        required:true
    },
    downloads:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]

},{
    timestamps:true
})



export const Pdf = mongoose.model("Pdf",pdfsModel)