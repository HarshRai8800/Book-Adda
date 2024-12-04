import { Router } from "express"
import { Add_Book_To_Favourite,Delete_Book_From_Favourite,Find_Favourite_Books } from "../controllers/Favourites.controllers.js"
import { UserAuthorization } from "../middlewares/auth.middleware.js"
const route = Router()

route.post("/add-book_favourite",UserAuthorization,Add_Book_To_Favourite)
route.delete("/delete_book_from_favourites",UserAuthorization,Delete_Book_From_Favourite)
route.get("/find-favourites-book",UserAuthorization,Find_Favourite_Books)

export default route