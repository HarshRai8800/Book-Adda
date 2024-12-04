import { Books } from "../models/books.schema.js";
import { Order } from "../models/order.Schema.js";
import { User } from "../models/user.schema.js"; 
import { SendOrderMail } from "../utils/nodemailer.js";
import instance from "../utils/Razorpay.js";
import {validateWebhookSignature} from "razorpay/dist/utils/razorpay-utils.js"
import crypto from 'crypto';

import axios from "axios"
const Place_Order=async (req,res)=>{

    const {book} = req.body
 
    const id = req.body.id
  

    const sold = await Books.findByIdAndUpdate(book,{
        buyer:id,
        sold:"true"
    }).populate("owner")
    console.log(sold)
if(!sold){
    return res.status(400).json({
        msg:"book not found error"
    })
}


const order =await Order.create({
    status:"order placed",
    buyer:id,
    seller:sold.owner,
    books:sold._id
})
await order.save()
const user =await User.findByIdAndUpdate(id,{
    $pull:{
        cart:book
    },$push:{
        order:order._id
    }
})
const what =await User.findByIdAndUpdate(sold.owner._id,{
   $push:{
        listed:book
    }
})
console.log(what+"!1225366")

if(!order)return res.json(400).json({msg:"there is an error in creating the order"})
await SendOrderMail(sold.owner.email,`Your listed book Titled ${sold.title} has been sold successfully`,`the  customer name
    is ${user.username} and phone number = ${user.ponenumber} and email = ${user.email} findly get in contact with
     each other and deliver the book to the buyer soon nas if not your account will be blocked`)
await SendOrderMail(user.email,`Your have succesfully purchased the book Titled ${sold.title}`,` has been sold successfully the  seller name
    is ${sold.owner.username} and phone number = ${sold.owner.phonenumber} and email = ${user.email} kindly get in contact with
     each other and recieve the book from the buyer `)
await User.findByIdAndUpdate(id,{
  $push:{
    history:sold._id
  }
})
await User.findByIdAndUpdate(sold.owner._id,{
    $push:{
      soldHistory:sold._id
    }
  })

  return res.status(200).json({
    msg:"order placed successfully  it will be delivered soon",
   data: sold
})
    }
   


const Oreder_Out_For_Delevery = async(req,res)=>{
    const {bookId }= req.body
    
    const orderSet = await Order.findByIdAndUpdate(bookId,{
        status:"order InProcess"
    })
    console.log(orderSet)
    if(orderSet){
        return res.status(200).json({
            msg:"order is in progress"
        })
    }else{
        return res.status(400).json({
            msg:"something went wrong"
        })
    }
}

const Order_Received_By_User = async(req,res)=>{
    const {bookId }= req.body
    
    const orderSet = await Order.findByIdAndUpdate(bookId,{
        status:"Delivered"
    })
    await User.findById(req.user_id,{
        $pull:{
            order:orderSet._id
        }
    })
    if(orderSet){
        return res.status(200).json({
            msg:"order received succesfully"
        })
    }else{
        return res.status(400).json({
            msg:"something went wrong"
        })
    }

}

const Order_history_User = async(req,res)=>{
 const _id = req.user

const history = await User.findById(_id).populate(
    
    {
        path:"order",
        populate:{
            path:"books"
        }

    }
    
)
console.log(history)
if(history){
    return res.status(200).json({
        history
    })
}

return res.status(400).json({
    msg:"errror occured while getting al orders"
})
}


const PAYMENT_CREATE_ORDER = async(req,res)=>{

    var options = {
      amount: Number(req.body.amount*100), 
      currency: "INR",
    
    };
    instance.orders.create(options, function(err, order) {
      console.log(order);
      res.status(200).json({
        order
      })
    });

}
const PAYMENT_VERIFICATION_ORDER=async(req,res)=>{
try {
  const {
    razorpay_payment_id, razorpay_order_id,razorpay_signature,id,book
  }=req.body
  console.log(razorpay_order_id)
  const key_secret = process.env.RAZORPAY_KEY_SECRET; 
  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex")
    console.log(generated_signature==razorpay_signature)
  if (generated_signature == razorpay_signature) {
    console.log("in1")
    const ress = await axios.post("http://localhost:5675/api/v1/order/place-order",{
        id:id,
        book:book
    })
    console.log(ress.data)
          
       return res.status(200).json({
        msg:"sucessfull"
       })
    }
    else{
        const ress = await axios.post("http://localhost:5675/api/v1/order/place-order",{
            id:id,
            book:book
        })
        console.log(ress.data)
        return res.status(200).json({
            msg:"payment failed"
        })
       }

   }
   


 catch (error) {
    console.log(error)
}



}
const RAZOR_PAY_KEY = async(req,res)=>{
    const key = process.env.RAZORPAY_KEY_ID
    res.status(200).json({
        key
    })
}

export{
    Place_Order,
    Order_Received_By_User,
    Oreder_Out_For_Delevery,
    Order_history_User,
    PAYMENT_CREATE_ORDER,
    PAYMENT_VERIFICATION_ORDER,
    RAZOR_PAY_KEY
}