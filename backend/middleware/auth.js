
const user=require('../models/user.model');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');


const me = async (req, res) => {
    try {
        const currentUser = await user.findById(req.user.id).select('-password');
        res.status(200).json(currentUser);
    }catch (error) {
        res.status(500).json({ error: 'Error fetching current user' });
    }
}

const protect=async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await user.findById(decoded.id).select('-password');
             return next();
        }catch(err){
            console.error("Token verification failed",err);
            res.status(401).json({error:'Not authorized, token failed'});
        }
    }else{
        res.status(401).json({error:'Not authorized, no token'});
    }
}   



const validatepassword=async (req,res,next)=>{
    try{
    if(req.body.password.length<6){
        return res.status(400).json({error:'Password must be at least 6 characters long'});
    }
    next();
}catch(error){
    res.status(500).json({error:'Server error'});
}
}

//validate required fields
const validaterequiredfields=async (req,res,next)=>{
    try{
        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400).json({error:'Name, email, and password are required'});
        }
        next();
    }catch(error){
        res.status(500).json({error:'Server error'});
    }
}

module.exports = { validatepassword, validaterequiredfields, protect, me };