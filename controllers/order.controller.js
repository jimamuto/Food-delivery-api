const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

//create a new order 
const createOrder = async (req, res) => {
    try{
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);

    }catch (error) {
        res.status(500).json({ message: "couldn't create an order" });
    }
}
//get all orders
const readOrders = async (req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);

    }catch (error) {
        res.status(500).json({ message: "couldn't get orders" });
    }
}
//get an order
const readOrderById = async (req, res) => {
    try{
        const { id } = req.params;
        const order = await Order.findById(id);
    }catch (error) {
        res.status(500).json({ message: "couldn't get the order" });
    }
}   

//update an order
const updateOrder = async (req, res) => {
    try{
        const { id } = req.params;

      
        const updatedOrder = await Order.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true } 
        );
          if(!updatedOrder){
            return res.status(404).send('Order not found');
        }
        res.status(200).json(updatedOrder);
        
    }catch (error) {
        res.status(500).json({ message: "couldn't update the order" });
    }
} 

//delete an order

const deleteOrder = async (req, res) => {
    try{
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        
        if(!order){
            return res.status(404).send('Order not found');
        }
        

    }catch (error) {
        res.status(500).json({ message: "couldn't delete the order" });
    }
}

module.exports = {
    createOrder,
    readOrders,
    readOrderById,
    updateOrder,
    deleteOrder
};  