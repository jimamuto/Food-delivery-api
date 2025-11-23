const express = require('express');
const User = require('../models/user.model');

//create a new user
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//get all users
const getAllUsers = async (req, res) => { 
    try{
        const users = await User.find();
        res.status(200).json(users);

    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

//get a user by id
const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//update a user by id
const updateUserById = async (req, res) => {
    try{   
       
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
       
        res.status(200).json(updatedUser);

        
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//delete  a user
const deleteUser = async (req,res)=>{
    try{
       
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(deletedUser);
    

    }catch(error){
        res.status(500).json({ message: error.message });


    }
}
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser
};  