const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line

const productroute = require('./routes/product.routes');
const categoryroute = require('./routes/category.routes');
const orderroute = require('./routes/order.routes');
const userroute = require('./routes/user.routes');

const app = express();

// Add CORS middleware
app.use(cors({
    origin: 'http://localhost:3001', // Allow your React frontend
    credentials: true
}));

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://jimamuto:pass@backenddb.bcdv7yi.mongodb.net/?appName=BackendDB')
  .then(() => console.log('Connected to your database'));

// Add a simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Your existing routes
app.use('/api/products', productroute);
app.use('/api/categories', categoryroute);
app.use('/api/orders', orderroute);
app.use('/api/users', userroute);

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'SaveEAT API Server is running!',
        endpoints: {
            products: '/api/products',
            categories: '/api/categories',
            orders: '/api/orders',
            users: '/api/users',
            test: '/api/test'
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});