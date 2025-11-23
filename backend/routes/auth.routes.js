const express = require('express');
const { registeruser, loginuser} = require('../controllers/authcontroller');
const router = express.Router();
const {  validatepassword, validaterequiredfields,me,protect} = require('../middleware/auth');

//  registration route
router.post('/register', validaterequiredfields, validatepassword, registeruser);



//login user routes
router.post('/login',loginuser);

//route for me function 
router.get('/me', protect, me);



module.exports = router;