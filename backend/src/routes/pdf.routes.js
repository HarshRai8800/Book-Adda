import { Router } from "express"
import { Update_Pdf,Delete_Pdf,Get_All_Pdf,Add_Pdfs ,GET_RECENT_PDF,GET_BY_ID} from "../controllers/Pdf.controllers.js" 
import { AdminAuthorization } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
const route = Router()
route.put("/update-content",upload.fields([{
    name:"avatar",
    maxCount:1,
},
{
    name:"content",
    maxCount:1,
}]),AdminAuthorization,Update_Pdf)
route.delete("/delete-content",AdminAuthorization,Delete_Pdf)
route.get("/get-content",Get_All_Pdf)
route.post("/add-content",upload.fields([{
    name:"avatar",
    maxCount:1,
},
{
    name:"content",
    maxCount:1,
}]),AdminAuthorization,Add_Pdfs)
route.get("/get-recent",GET_RECENT_PDF)
route.post("/get-by-id",GET_BY_ID)
export default route