const express = require('express');
const router = express.Router();
const Oders = require('../controllers/orders');
const userMiddleware = require('../middlewares/user');
router.post('/order',userMiddleware.restrictedLoggedUserOnly,Oders.addOrder);
router.delete('order',userMiddleware.restrictedLoggedUserOnly,Oders.deleteOrder);

module.exports = {router};