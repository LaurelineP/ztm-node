const express 				= require('express');
const messagesRouter 		= express.Router();
const messagesController 	= require('../controllers/messages.controller');

messagesRouter
/* -------------------------------------------------------------------------- */
/*                         FIRST WAY - WITH ENDPOINTS                         */
/* -------------------------------------------------------------------------- */
	.get('/messages', messagesController.getMessages )
	.post('/messages', messagesController.postMessage );


/* -------------------------------------------------------------------------- */
/*           SECOND WAY - WITHOUT ENDPOINT AS ALREADY PRE-CONFIGURED          */
/* -------------------------------------------------------------------------- */
	// .get('/', messagesController.getMessages )
	// .post('/', messagesController.postMessage );


module.exports = messagesRouter;