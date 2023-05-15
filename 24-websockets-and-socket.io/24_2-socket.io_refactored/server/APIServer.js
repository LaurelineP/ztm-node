const express 				= require('express');

/* [express] - Creates express sever and set middleware to serve static files */
const APIServer = express();
APIServer.use(express.static('public', { extensions: ['html'] }));


module.exports = {
	APIServer
}