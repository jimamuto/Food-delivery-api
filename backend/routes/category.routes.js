const express = require('express');
const router = express.Router();
const {createCategory,readCategories,readCategoryById,updateCategory,deleteCategory} = require('../controllers/category.controller');

router.post('/', createCategory);
router.get('/', readCategories);
router.get('/:id', readCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;