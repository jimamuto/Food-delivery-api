const express = require('express');

const Category= require('../models/category.model');

//create a new category 
const createCategory= async (req, res) => {
    try {
        const category= new Category(req.body);
        await category.save();
        res.status(201).json(category);

    }catch (error) {
        res.status(500).json({ message:"couldnt create a category" });
    }
}

//get all categories
const readCategories= async (req, res) => {
    try{
        const categories=await Category.find();
        res.status(200).json(categories);

    }catch (error) {
        res.status(500).json({ message:"couldnt get categories" });
    }
}

//get a specific category by id
const readCategoryById= async (req, res) => {
    try{
        const {id}= req.params;
        const category= await category.findById(id);
    }catch (error) {
        res.status(500).json({ message:"couldnt get category" });
    }
}

//update a category
const updateCategory= async (req, res) => {
    try{
        const { id } = req.params;

        if(!category){
            return res.status(404).send('category not found');
        }
        const updatedCategory = await category.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true } 
        );
        res.status(200).json(updatedCategory);

    }catch (error) {
        res.status(500).json({ message:"couldnt update category" });
    }
}

//delete a category
const deleteCategory= async (req, res) => {
    try{
        const {id}= req.params;
        if(!category){
            return res.status(404).send('category not found');
        }
        await category.findByIdAndDelete(id);
        res.status(200).json({ message:"category deleted successfully" });

    }catch (error) {
        res.status(500).json({ message:"couldnt delete category" });
    }
}

module.exports= {
    createCategory,
    readCategories,
    readCategoryById,
    updateCategory,
    deleteCategory  
}