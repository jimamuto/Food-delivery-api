const express = require('express');
const mongoose = require('mongoose');
const Schema= new mongoose.Schema();

const userschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:"user"},
    phone:{type:String},
    address:{type:String}
},{
    timestamps:true
})

const User=mongoose.model("User",userschema);
module.exports=User;