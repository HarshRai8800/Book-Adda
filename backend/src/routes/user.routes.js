import { Router } from "express";
import { SigupController,LoginController,Get_User_Information,
update_User_Information,CHANGE_AVATAR,Get_All_Books,USER_INFORMATION,
USER_INFORMATION2,
USER_INFORMATION3} from "../controllers/User.controllers.js";
import { UserInputVlidate } from "../middlewares/zod.middleware.js";
import { UserAuthorization } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const  route = Router()

route.post("/sigup",UserInputVlidate,SigupController)
route.post("/login",UserInputVlidate,LoginController)
route.get("/get-user-information",UserAuthorization,Get_User_Information,)
route.get("//",(req,res)=>{
    console.log(req.cookies)
    res.json({msg:"ok"})
})
route.post("/change-avatar",UserAuthorization,upload.fields([
    {
        name:"avatar",
        maxCount:1
    }
]),CHANGE_AVATAR)
route.get("/get-books-all",Get_All_Books)
route.get("/history",UserAuthorization,USER_INFORMATION)
route.get("/history2",UserAuthorization,USER_INFORMATION2)
route.get("/history3",UserAuthorization,USER_INFORMATION3)
route.post("/update-user-information",UserInputVlidate,UserAuthorization,update_User_Information)
export default route