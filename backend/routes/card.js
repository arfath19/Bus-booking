const express=require('express');
const router=express.Router();
const cardSchema=require('../controllers/card');

router.post("/",cardSchema.saveCard);

module.exports=router;