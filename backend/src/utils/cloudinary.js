import { v2 as cloudinary } from 'cloudinary';
import cluster from 'cluster';
import { error } from 'console';


import fs from "fs/promises"

     cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: "AYunTuU5YM2pMkMm3ELeg7G2rdA"
    });
const uploadImage=async(filePath)=>{
if(!filePath)return null

try {
    const response = await cloudinary.uploader.upload(filePath,{
        resource_type:"auto"
    })
    console.log(response)
    if(response){
        console.log("file uploaded succesfully : "+ response )
        fs.unlink(filePath)
        return response.url
} else{
    return error
}
}
catch (error) {
    fs.unlink(filePath)
 console.log("error is there  at cloudinary uploader")
 console.log(error)
 return false
}



}
const uploadpdf=async(filePath)=>{
    if(!filePath)return null
    
    try {
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type:"raw"
        })
        console.log(response)
        if(response){
            console.log("file uploaded succesfully : "+ response )
            fs.unlink(filePath)
            return response.url
    } else{
        return error
    }
    }
    catch (error) {
        fs.unlink(filePath)
     console.log("error is there  at cloudinary uploader")
     console.log(error)
     return false
    }
    
    
    
    }
    
const deleteImage = async(url)=>{
    try {
        if(!url)return
      await  cloudinary.uploader.destroy(url,(error,result)=>{
            if (error) {
                console.error("Error deleting image:", error);
              } else {
                console.log("Image deleted successfully:", result);
              }
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    uploadImage,
    deleteImage,
    uploadpdf
}