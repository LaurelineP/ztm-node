const { sendRouteText } = require('./utils.controller');

function getMessages (req, res) { sendRouteText( req, res, 'Messages list') };
function postMessage (req, res) {
	console.log( 'RECEIVING MESSAGE')
	if( !req.body.message ){
		res.status(400).json({
			error: "Missing message"
		})
	} else {
		const newMessage = {
			message: req.body.message,
			id: messages.length
		}
		messages.push(newMessage);
		res.status(200).json(newMessage)
	}
	sendRouteText( req, res, 'Messages list')
};

module.exports = {
	getMessages,
	postMessage
}