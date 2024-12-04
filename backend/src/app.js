import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import user from "./routes/user.routes.js"
import admin from "./routes/admin.routes.js"
import books from "./routes/book.route.js"
import favourites from "./routes/favourites.routes.js"
import order from "./routes/order.routes.js"
import cart from "./routes/cart.routes.js"
import verify from "./routes/verify.route.js"
import pdf from "./routes/pdf.routes.js"

import cookieParser from "cookie-parser"


dotenv.config({path:"./.env"})
const app = express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())


app.use("/api/v1/user",user)
app.use("/api/v1/admin",admin)
app.use("/api/v1/books",books)
app.use("/api/v1/verify",verify)
app.use("/api/v1/cart",cart)
app.use("/api/v1/favourites",favourites)
app.use("/api/v1/pdf",pdf)
app.use("/api/v1/order",order)



export default app