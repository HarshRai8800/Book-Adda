import zod from "zod"



const UserInputVlidate = async(req,res,next)=>{
    console.log(req.body)
const user = zod.object({
    username:zod.string().optional(),
    email:   zod.string().email(),
    password: zod.string(),
    phonenumber:zod.number().optional(),
    adress:zod.string().optional(),
})

const check = user.safeParse(req.body)
console.log(check.error)
if(!check.success) return res.status(200).json({
    msg:"wrong input send"
})
next()



}
const AdminInputVlidate = async(req,res,next)=>{
    const Admin = zod.object({
        name:zod.string().max(18),
        email:   zod.string().email(),
        password: zod.string(),
       
    })
    
    const check = Admin.safeParse(req.body)
    if(!check.success)res.status(200).json({
        msg:"wrong input send"
    })
    next()
    
    
    
    }

export{
    UserInputVlidate,
    AdminInputVlidate
}