const express 				= require('express');
const { httpGetAllLaunches, httpPostNewLaunch, httpDeleteLaunch }	= require('./launches.controller');

const launchesRouter 	= express.Router();

launchesRouter
	.get('/', httpGetAllLaunches )
	.post('/', httpPostNewLaunch )
	.delete('/:id', httpDeleteLaunch )


module.exports = launchesRouter;