const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login').login;
router.post('/auth/signup',signup.isExist,signup.signup);
router.post('/auth/login',login);
module.exports = {router};