const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const dotenv = require('dotenv');
dotenv.config();


const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const productroute = require('./routes/product.routes');
const categoryroute = require('./routes/category.routes');
const orderroute = require('./routes/order.routes');
const userroute = require('./routes/user.routes');
const authroute = require('./routes/auth.routes');

const app = express();


// Add CORS middleware
app.use(cors({
    origin: 'http://localhost:3001', // Allow your React frontend
    credentials: true
}));

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to your database'));


app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Your existing routes
app.use('/api/products', productroute);
app.use('/api/categories', categoryroute);
app.use('/api/orders', orderroute);
app.use('/api/users', userroute);
app.use('/api/auth', authroute);



// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: ' API Server is running!',
        endpoints: {
            products: '/api/products',
            categories: '/api/categories',
            orders: '/api/orders',
            users: '/api/users',
            test: '/api/test',
            register: '/api/auth',
            login:'/api/auth'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});