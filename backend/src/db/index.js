import mongoose from "mongoose"




const dbConnect = async ()=>{
    try {
   const db = await mongoose.connect(process.env.MONGOOSE_KEY)
    if(db){
        console.log("databse is connected ")
    }

    } catch (error) {
        console.log("connection failed")
    }
}
export {
    mongoose
}
export default dbConnect