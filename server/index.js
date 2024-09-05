import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv, { config } from "dotenv"
dotenv.config()

import { postLogin, postSignup } from "./controllers/user.js"

const app = express()
app.use(express.json())
app.use(cors())

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    if (conn) {
        console.log(`MongoDB connected successfully ✅`);

    }
}
connectDB()

app.get("/", (req, res) => {
    res.json({
        message: "Welc0me to Nursery Project",
        success: true
    })
})

app.post("/signup", postSignup);

app.post("/login", postLogin);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})