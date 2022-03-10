const messages = require('../models/messages.model');
const { sendRouteText } = require('./utils.controller');

function getMessages (req, res) { sendRouteText( req, res, `Messages list:\n
	${ messages?.map( msg => `${ msg.id } - ${ msg.message }\n`)}
`) };
function postMessage (req, res) {
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
		res.status(200).json(messages)
	}
	sendRouteText( req, res, 'Fail');

};

module.exports = {
	getMessages,
	postMessage
}