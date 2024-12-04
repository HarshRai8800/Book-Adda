import { Router } from "express";
import { SigupAdmin } from "../controllers/Admin.controllers.js";
import {AdminInputVlidate } from "../middlewares/zod.middleware.js";
import { LoginAdmin,Add_Books,Get_All_Books,Get_Book_By_Id,Get_Recent_Books,Update_Book,Delete_Books } from "../controllers/Admin.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { AdminAuthorization } from "../middlewares/auth.middleware.js";
const  route = Router()

route.post("/Admsigup",AdminInputVlidate,SigupAdmin)
route.post("/Admlogin",AdminInputVlidate,LoginAdmin)
route.post("/Book-Create",AdminAuthorization,upload.fields([{
    name:"avatar",
    maxCount:1
}]),Add_Books)
route.get("/get_all_books",AdminAuthorization,upload.fields([{
    name:"avatar",
    maxCount:1
}]),Get_All_Books)
route.get("/get_books_id",upload.fields([{
    name:"avatar",
    maxCount:1
}]),Get_Book_By_Id)
route.get("/get_recent_books/:id",upload.fields([{
    name:"avatar",
    maxCount:1
}]),Get_Recent_Books)
route.post("/update_books",AdminAuthorization,upload.fields([{
    name:"avatar",
    maxCount:1
}]),Update_Book)
route.delete("/delete_books",AdminAuthorization,upload.fields([{
    name:"avatar",
    maxCount:1
}]),Delete_Books)

export default route