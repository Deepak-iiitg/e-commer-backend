const express = require('express');
const router = express.Router();
const Cart = require('../controllers/addCart');
const userMiddleware = require('../middlewares/user');
router.post('/cart',userMiddleware.restrictedLoggedUserOnly,Cart.addCart);
router.delete('/cart',userMiddleware.restrictedLoggedUserOnly,Cart.deleteFromCart);
router.patch('/cart',userMiddleware.restrictedLoggedUserOnly,Cart.updateQuantity);
module.exports = {router};