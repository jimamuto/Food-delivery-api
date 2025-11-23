
const User=require('../models/user.model');
const jwt=require('jsonwebtoken');
//we generate token for register and login functions

const generatetoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    });
}

const registeruser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const newUser = await User.create({ name, email, password });

        const token = generatetoken(newUser._id);

        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token
        });
    } catch (error) {
        // <-- ADD THIS
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

//login user
const loginuser=async (req,res)=>{
    const {email,password}=req.body;
    try {
     
        if(!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        const foundUser = await User.findOne({email});
       if (!foundUser || !(await foundUser.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
}
        //generating jwt token
        const token= generatetoken (foundUser._id);
         
         res.status(200).json({ id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
};



module.exports = { registeruser, loginuser };