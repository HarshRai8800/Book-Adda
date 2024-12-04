import { Router } from "express"
import { Add_Book_To_Cart,Delete_Book_From_Cart,Find_Cart_Books } from "../controllers/Cart.controllers.js"
import { UserAuthorization } from "../middlewares/auth.middleware.js"
const route = Router()
route.post("/add-books",UserAuthorization,Add_Book_To_Cart)
route.delete("/delete_book",UserAuthorization,Delete_Book_From_Cart)
route.get("/find-from-cart",UserAuthorization,Find_Cart_Books)

export default route