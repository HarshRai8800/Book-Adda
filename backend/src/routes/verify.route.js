import { Router } from "express";
 import { Check_Otp_Mail,Resend_Otp_Mail } from "../controllers/Verify.controllers.js";
import { UserAuthorization } from "../middlewares/auth.middleware.js";
const route = Router()
route.post("/check-otp",UserAuthorization,Check_Otp_Mail)
route.post("/resend-otp",UserAuthorization,Resend_Otp_Mail)

export default route