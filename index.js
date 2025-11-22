const express = require('express');
const mongoose = require('mongoose');
const productroute = require('./routes/product.routes');
const product= require('./models/product.model');
const app = express();


// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://jimamuto:kayole12A@backenddb.bcdv7yi.mongodb.net/?appName=BackendDB')
  .then(() => console.log('Connected to your database'));


// app.use('/', (req, res) => {
//     res.send('Welcome to the Product API');
// });
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// //route to any routes in the system
 app.use('/api/products', productroute);




