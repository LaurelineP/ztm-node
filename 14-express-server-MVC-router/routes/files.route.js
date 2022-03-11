const express = require('express');
const filesController = require('../controllers/files.controller');

const filesRouter = express.Router();
filesRouter
	.get('/', filesController.getFiles )
	.get('/html', filesController.getFileHTML )
	.get('/image', filesController.getFileImage )

module.exports = filesRouter;