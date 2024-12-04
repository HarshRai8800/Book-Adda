import { User } from "../models/user.schema.js";
import { Books } from "../models/books.schema.js";


const Add_Book_To_Favourite = async(req,res)=>{

try {
    const _id = req.user._id
    const {id}= req.body
    const bookexists  =await User.findById(_id)
    if(bookexists.favourites.includes(id)){
        return res.status(400).json({
            msg:"book has been added already"
        })
    }
const add = await User.findByIdAndUpdate(_id,{
    $push:{
        favourites:id
    }
})
if(!add){
return res.status(400).json({
    msg:"user not updated and error"
})
}

return res.status(200).json({
    msg:"user updated successfully booked to favourites",
    
})


} catch (error) {
    
}


}

const Delete_Book_From_Favourite = async(req,res)=>{
try {

        const _id = req.user._id
        const {id}= req.body
        const bookexists  =await User.findById(_id)
        if(bookexists.favourites.includes(id)){
            const add = await User.findByIdAndUpdate(_id,{
                $pull:{
                    favourites:id
                }})
                
    if(!add){
        return res.status(400).json({
            msg:"user not delete and error"
        })
        }
        return res.status(200).json({
            msg:"deletion sucessfull",
            add
        })
 

    }
    
    return res.status(500).json({
        msg:"deletion failed"
    })
    
    
    } catch (error) {
        return res.status(500).json({
            msg:"internal server error"
        })
        
    }
    
    
    }
 
const Find_Favourite_Books = async (req,res)=>{
try {
    const _id = req.user._id


const fav = await User.findById(_id).populate("cart")
console.log(fav)
if(!fav){
    return res.status(400).json({
        msg:"favourites not found"
    })
}
const data = fav
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
    Add_Book_To_Favourite,
    Delete_Book_From_Favourite,
    Find_Favourite_Books
}