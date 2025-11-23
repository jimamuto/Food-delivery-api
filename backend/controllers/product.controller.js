const express = require('express');
const app = express();
const Product = require('../models/product.model');


//create
const createproduct = async (req, res) => {
    try {
        const product = new Product(req.body); 
        await product.save();
        res.status(201).json(product); 
    } catch(err) {
        res.status(400).json({message:"could not create the product"});
    }
};
//read  all products
const readproducts= async(req, res) => {
    // Logic to get all products
    try{
        const products= await Product.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({message:"the products do not exist in the database"});
    }

};

//read a specific product by id
const readproductById= async(req, res) => {
    try{
        const {id}= req.params;
        const product= await Product.findById(id);
        if(!product){
            return res.status(404).send('Product not found');
        }
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({message:"the product does not exist"});
    }
};
//updating a product 
const updateproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedproduct = await Product.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true } 
        );
        
        if (!updatedproduct) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json(updatedproduct); 
    } catch(err) {
        res.status(400).json({message:"could not update product"});  
    }
};


//deleting a product 
const deleteproduct= async(req, res) => {
    try{
        const {id}= req.params;
        const product= await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).send('Product not found');
        }
        res.status(200).json({message:"product deleted successfully"});
    }catch(err){
        res.status(500).json({message:"could not delete product"});  
    }

};
module.exports = {
    createproduct,
    readproducts,
    readproductById,
    deleteproduct,
    updateproduct
};
 

