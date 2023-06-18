import express from "express";
import userRouter from "./routes/userRoutes.js"
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./configs/db.js";
import { config } from "dotenv";
config()

connectDB()
const app = express()
const port = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.use(cookieParser())

app.use('/api/user', userRouter);

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`listening on port : ${port}`));
