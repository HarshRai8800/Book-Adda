import mongoose from "mongoose";
import { Schema } from "mongoose";
const order = new Schema({
    seller:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    buyer:{
   type:Schema.Types.ObjectId,
   ref:"User"    
    },
    books:{
        type:Schema.Types.ObjectId,
        ref:"Books"
    },
    status:{
        type:String,
        default:"order placed",
        enum:["order placed","order InProcess","Delivered","canceled"]
    }
},{
    timestamps:true
})


export const Order = mongoose.model("Orders",order)