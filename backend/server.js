import express from "express";
import userRouter from "./routes/userRoutes.js"
import morgan from "morgan";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import { config } from "dotenv";
config()

const app = express()
const port = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extends: true }))

app.use('/api/user', userRouter);

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`listening on port : ${port}`));
