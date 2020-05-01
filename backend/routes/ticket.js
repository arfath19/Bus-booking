const express= require('express');
const router= express.Router();
const TicketController=require('../controllers/ticket');


const checkAuth=require('../middleware/check-auth');
router.post('/',checkAuth,TicketController.saveTicket);
module.exports=router;

