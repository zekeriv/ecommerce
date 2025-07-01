import express from 'express'
import path from 'path'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// added for deployment
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// **

// App config
const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors())

// ** deployment
app.use(express.static(path.join(__dirname, '../frontend/dist')))
app.use(express.static(path.join(__dirname, '../admin/dist')))
app.use('/static', express.static(path.join(__dirname, 'static')))
// **

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

// added for deployment 
const adminRoutes = ['/add', '/list', '/orders', '/admin']
app.get(adminRoutes, (req, res) => {
	res.sendFile(path.resolve(__dirname, '../admin/dist', 'index.html'))
})
app.get('/{*any}', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'))
})

app.listen(port,()=> console.log('Server started on PORT : '+ port))
// **