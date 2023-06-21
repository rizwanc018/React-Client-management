import express from "express";
import userRouter from "./routes/userRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./configs/db.js";
import { config } from "dotenv";
import cors from 'cors'

config()

connectDB()
const app = express()
const port = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.use(cookieParser())

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);


app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`listening on port : ${port}`));
