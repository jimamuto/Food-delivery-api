const express = require('express');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { 
        type: String,
        required: true
    },
    
   
    deliveryAddress: { type: String, required: true },
    paymentstatus: { 
       type: String,
       enum: ['Pending', 'Completed', 'Failed'],
       default: 'Pending'   
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;