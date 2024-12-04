import { Router } from "express";
import { Order_Received_By_User,Order_history_User,PAYMENT_CREATE_ORDER,Oreder_Out_For_Delevery,
 RAZOR_PAY_KEY,  PAYMENT_VERIFICATION_ORDER ,Place_Order } from "../controllers/Order.controllers.js";
import { UserAuthorization } from "../middlewares/auth.middleware.js";

const route = Router()
route.post("/place-order",Place_Order)
route.post("/order_received",Order_Received_By_User)
route.get("/order-history",UserAuthorization,Order_history_User)
route.post("/order-out-for-delivery",Oreder_Out_For_Delevery)
route.post("/create-order",PAYMENT_CREATE_ORDER)
route.post("/verification-order",PAYMENT_VERIFICATION_ORDER)
route.post("/razor-key",RAZOR_PAY_KEY)
export default route

