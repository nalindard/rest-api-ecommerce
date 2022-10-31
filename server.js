import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
// import bodyParser from "body-parser"

mongoose.connect(
  process.env.DB_URL,
  () => console.log(`Successfully connected to the DataBase`),
  e => console.log(e)
)

const app = express()
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT

// Routers,
import { router as authRouter } from './routes/auth.js'
import { router as userRouter } from './routes/userRouter.js'
import { router as adminRouter } from './routes/adminRouter.js'
import { router as productRouter } from './routes/productRouter.js'
import { router as cartRoter } from './routes/cartRouter.js'
import { router as orderRouter } from './routes/orderRouter.js'
app.use('/auth',authRouter)
app.use('/users', userRouter)
app.use('/admins', adminRouter)
app.use('/products', productRouter)
app.use('/carts', cartRoter)
app.use('/orders', orderRouter)

app.listen(port, () => console.log(`Server running on port:${port}`))
