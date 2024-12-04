import { Router } from "express";
import { List_Book, Update_Book_User} from "../controllers/Books.controllers.js";
import { UserAuthorization } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"


const route = Router()
route.post("/list-book",upload.fields([{
    name:"avatar",
    maxCount:1
},{
    name:"content",
    maxCount:1
}]),UserAuthorization,List_Book)
route.put("/update-books",upload.fields([{
    name:"avatar",
    maxCount:1
},{
    name:"content",
    maxCount:1
}]),UserAuthorization,Update_Book_User)



export default route