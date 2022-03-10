const express = require('express');
const friendsController = require('../controllers/friends.controller')

/** 3.a. Define router by cluster of similar routes - with entrypoint */
// const friendsRouter = express.Router();
// friendsRouter




/** 3.b. Define router by cluster of similar routes - without entrypoint  */
const friendsRouter = express.Router();
friendsRouter
/* -------------------------------------------------------------------------- */
/*                         FIRST WAY - WITH ENDPOINTS                         */
/* -------------------------------------------------------------------------- */
	// .get('/friends', friendsController.getFriends )
	// .get('/friends/:friendID', friendsController.getFriend )
	// .post('/friends', friendsController.postFriend );

/* -------------------------------------------------------------------------- */
/*           SECOND WAY - WITHOUT ENDPOINT AS ALREADY PRE-CONFIGURED          */
/* -------------------------------------------------------------------------- */
	.get('/', friendsController.getFriends )
	.get('/:friendID', friendsController.getFriend )
	.post('/', friendsController.postFriend );

module.exports = friendsRouter;