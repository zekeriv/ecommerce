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

// Added for deployment
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();

// FIXED: Use consistent PORT variable and AWS App Runner environment variable
const PORT = process.env.PORT || 4000;

console.log('Starting server...');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', PORT);

// Initialize database connections with better error handling
console.log('Attempting to connect to database...');
console.log('MongoDB URI available:', !!process.env.MONGODB_URI);

try {
    await connectDB();
    console.log('Database connected successfully');
} catch (error) {
    console.error('Database connection failed:', error);
    // Don't exit immediately, continue without DB for debugging
    console.log('Continuing without database connection for debugging...');
}

console.log('Attempting to connect to Cloudinary...');
console.log('Cloudinary config available:', {
    cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
    api_key: !!process.env.CLOUDINARY_API_KEY,
    api_secret: !!process.env.CLOUDINARY_API_SECRET
});

try {
    await connectCloudinary();
    console.log('Cloudinary connected successfully');
} catch (error) {
    console.error('Cloudinary connection failed:', error);
    // Don't exit immediately, continue without Cloudinary for debugging
    console.log('Continuing without Cloudinary connection for debugging...');
}

// Middlewares
app.use(express.json())
app.use(cors())

// FIXED: Updated static file paths for App Runner build structure
app.use('/frontend', express.static(path.join(__dirname, 'public/frontend')))
app.use('/admin', express.static(path.join(__dirname, 'public/admin')))
app.use('/static', express.static(path.join(__dirname, 'static')))

// Health check endpoint (recommended for App Runner)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        port: PORT 
    });
});

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/api', (req, res) => {
    res.json({ message: "API Working", port: PORT })
})

// Admin routes - serve admin SPA
const adminRoutes = ['/add', '/list', '/orders', '/admin']
adminRoutes.forEach(route => {
    app.get(route, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public/admin', 'index.html'))
    })
})

// FIXED: Catch-all route for frontend SPA (this should be last)
app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.resolve(__dirname, 'public/frontend', 'index.html'))
})

// FIXED: Single app.listen call with proper host binding for containers
app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
    console.log(`Server successfully started on port ${PORT}`);
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});