import app from "./app.js";
import dbConnect from "./db/index.js";

const port = 5671
  dbConnect().
  then(()=>{
   try {
     app.listen( 5675,()=>{
         console.log("connected to database and listening on port "+ 5670)
     })
   } catch (error) {
    console.log(error)
   }
  }).
  catch((err)=>{
    console.log("sopmething went wrong" + err)
  }
  )




