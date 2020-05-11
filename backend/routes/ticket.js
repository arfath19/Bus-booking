const express= require('express');
const router= express.Router();
const TicketController=require('../controllers/ticket');


const checkAuth=require('../middleware/check-auth');
router.post('/',checkAuth,TicketController.saveTicket);
router.get('/',checkAuth,TicketController.getTicket);

module.exports=router;

