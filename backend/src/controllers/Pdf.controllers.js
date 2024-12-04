import { Admin } from "../models/admin.schema.js";
import { Pdf } from "../models/pdfs.schema.js";
import { uploadImage, uploadpdf } from "../utils/cloudinary.js";


    
    const Add_Pdfs = async(req,res)=>{
        const token = req.Admin._id
    
    if(!token){
        return res.status(400).json({
            msg:"proccess failed"
        })
    }
    const admin = await Admin.findById(token)
    if(!admin) return res.status(400).json({
        msg:"admin dose not exist"
    })
    
    const img = req.files.avatar[0].path
    const file = req.files.content[0].path
    if(!file&&!img){
        return res.status(400).json({
            msg:"file path not found"
            })
    }
    const urlImg = await uploadImage(img)
    const urlContent = await uploadpdf(file)
    if(!urlImg&&!urlContent){
        return res.status(400).json({
            msg:"url not found"
            })
    }
    
    console.log(urlContent)
    
    const {title,description} = req.headers
    const book = await Pdf.create({
    title,
    description,
    ContentUrl:urlContent,
    ImageUrl:urlImg,
    owner:token
    })
    
    book.save()
    if(!book)return res.status(400).json({
        msg:"there is an error in pdf creation"
    })
    return res.status(200).json({
        msg:"succesfully created",
        book
    })
    
    }
    
    
    const Update_Pdf = async (req,res)=>{
    try {
        const token = req.Admin._id
        if(!token)return res.status(400).json({msg:"error Admin not found"})
        
        const admin = await Admin.findById(token)
        if(!admin)return res.status(400).json({
            msg:"error hai bro admin not found "
        })
        const img = req.files.avatar[0].path
        const file = req.files.content[0].path
      let url , urlimg;
      if(img){
        url = await uploadImage(file)
      }
         if(urlimg){
            urlimg = await uploadImage(img)
         }
        
     
        
        
        const id = req.headers.id
        const {title,description} = req.body
        const books = await Pdf.findByIdAndUpdate(id,{
            title,
            description,
            ContentUrl:url,
            ImageUrl:urlimg,
       
        })
        console.log(books)
        if(!books){
            return res.status(400).json({msg:"pdf updated not possible"})}
            
        return res.status(200).json({msg:"pdf updated"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"error has occured while updating pdf"})
    }
    
    }
    
    const Delete_Pdf = async(req,res)=>{
        try {
            const {id} = req.headers
            const deleted = await Pdf.findByIdAndDelete(id)
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
    
    const Get_All_Pdf = async(req,res)=>{
       try {
      
         const find = await Pdf.find({}).sort({createdAt:-1})
         if(find.length==0){
     return res.status(400).json({
         msg:"pdf cannot be fetched"
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

  const GET_RECENT_PDF = async(req,res)=>{
try {
      
         const find = await Pdf.find({}).sort({createdAt:-1}).limit(4)
         if(find.length==0){
     return res.status(400).json({
         msg:"pdf cannot be fetched"
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


  const GET_BY_ID = async(req,res)=>{
    try {
      const {id} = req.body
        const find = await Pdf.findById({_id:id})
        if(find.length==0){
    return res.status(400).json({
        msg:"pdf cannot be fetched"
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

    export{
        Update_Pdf,
        Delete_Pdf,
        Get_All_Pdf,
        Add_Pdfs,
        GET_RECENT_PDF,
        GET_BY_ID
    }