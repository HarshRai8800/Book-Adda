import mongoose from "mongoose";
import { Schema } from "mongoose";
import { boolean } from "zod";

const bookModel = new Schema({
    title:{
        type:String,
        required:true ,
        upperCase:true,
        index:true
    },
    description:{
        type:String,
        required:true,
        maxLength:1000
    },
    ImageUrl:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        upperlimit:60,

    },
    quality:{
        type:Number,
        required:true,
        min:1,
        max:10
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    buyer:{
        type:Schema.Types.ObjectId,
        ref:"User"

    },
    sold:{
        type:String,
        default:"false"

}},{
    timestamps:true
})



export const Books = mongoose.model("Books",bookModel)





