import { User } from "../models/user.schema.js";



const Add_Book_To_Cart = async(req,res)=>{

try {
    const _id = req.user._id
    const {id}= req.body
    console.log(id)
    const user  =await User.findById(_id)
    console.log(user.cart.includes(id))
    if(user.cart.includes(id)){
        return res.status(400).json({
            msg:"book has been added already"
        })
    }
const add = await User.findByIdAndUpdate(_id,{
    $push:{
        cart:id
    }
})
if(!add){
return res.status(400).json({
    msg:"user not updated and error"
})
}

return res.status(200).json({
    msg:"user updated successfully booked to favourites"
})


} catch (error) {
    return res.status(400).json({
        msg:"internal server error"
    })
}


}

const Delete_Book_From_Cart = async(req,res)=>{
try {

        const _id = req.user._id
        const {id}= req.headers
        console.log(_id,id)
        const bookexists  =await User.findById(_id)
        console.log(bookexists)
        if(bookexists.cart.includes(id)){
            const add = await User.findByIdAndUpdate(_id,{
                $pull:{
                    cart:id
                }})
                
    if(!add){
        return res.status(400).json({
            msg:"user not deleted and error"
        })
        }
        return res.status(200).json({
            msg:"book deleted from the cart"
        })
    }
    
    return res.status(400).json({
        msg:"book deletion failed cart"
    })
    
    
    } catch (error) {
        return res.status(500).json({
            msg:"internal server error"
        })
        
    }
    
    
    }

const Find_Cart_Books = async (req,res)=>{
try {
    const _id = req.user._id


const cart = await User.findById(_id).populate("cart")
console.log(cart)
if(!cart){
    return res.status(400).json({
        msg:"cart not found"
    })
}
const data = cart.cart
return res.status(200).json({
    success:true,
    data
})



} catch (err) {
    console.log(err)
    return res.status(400).json({
        msg:"internal server error"
    })
}



}



export {
    Add_Book_To_Cart,
    Delete_Book_From_Cart,
    Find_Cart_Books
}