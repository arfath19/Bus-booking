const express= require('express');
const router= express.Router();
const UserController=   require('../controllers/user');

//npm install --save jsonwebtoken

router.post('/signup',UserController.createUser)

router.post('/login',UserController.userLogin);

module.exports=router;