const express = require('express');
const router = express.Router();
const {createproduct,readproductById,readproducts,updateproduct,deleteproduct} = require('../controllers/product.controller');


router.post('/',createproduct);
router.get('/', readproducts);
router.get('/:id',readproductById);
router.put('/:id',updateproduct);
router.delete('/:id',deleteproduct);

module.exports = router;