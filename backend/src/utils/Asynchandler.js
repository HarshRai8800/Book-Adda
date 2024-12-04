const asynchandler = (func)=> async (req,res,next)=>{
try {
   const responce = await func(req,res)
   console.log(responce)
} catch (error) {
    res.status(404).json({
        success:false,
        msg:error
    })
}


}
export default asynchandler