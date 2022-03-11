
const path = require('path');
const { sendRouteText } = require('./utils.controller');



function getFiles( req, res ){
	sendRouteText(req, res, 'FILES')
}

function getFileHTML( req, res ) {
	const filePath = path.join(__dirname, 'index.html' );
	const filePublicPath = path.join(__dirname, '..','public', 'index.html' );
	// res.sendFile(__dirname +'/index.html'); //OK but relative to your local
	res.sendFile( filePublicPath ); //OK but relative to your local
	// res.status(200).json({ text: 'hello'})
}

function getFileImage( req, res ){
	const filePublicPath = path.join(__dirname, '..', 'public', 'courseDescription.png');
	res.sendFile( filePublicPath );
}

module.exports = {
	getFiles,
	getFileHTML,
	getFileImage
}