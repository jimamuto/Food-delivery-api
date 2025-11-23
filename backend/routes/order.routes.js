const express = require('express');
const router = express.Router();
const {readOrders,readOrderById,createOrder,updateOrder,deleteOrder} = require('../controllers/order.controller');

router.get('/', readOrders);
router.get('/:id', readOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;