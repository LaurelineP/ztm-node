const express 				= require('express');
const { httpGetAllLaunches, httpScheduleNewLaunch, httpDeleteLaunch }	= require('./launches.controller');

const launchesRouter 	= express.Router();

launchesRouter
	.get('/', httpGetAllLaunches )
	.post('/', httpScheduleNewLaunch )
	.delete('/:id', httpDeleteLaunch )


module.exports = launchesRouter;