const express 				= require('express');
const messagesRouter 		= express.Router();
const messagesController 	= require('../controllers/messages.controller');

messagesRouter
	.get('/', messagesController.getMessages )
	.post('/', messagesController.postMessage );


module.exports = messagesRouter;