// Handlers to return and end stream by providing details about route
const sendRouteText = ( req, res, msg  ) => {
	console.log(`\n[ REQUEST ] - ${ req.url }`)
	const text = `<h1>Method: "${ req.method }" route "${ req.url }"</h1>
	${ msg ? `<p>${ msg } </p>` : null }
	`
	res.send( text );
};

module.exports = {
	sendRouteText
}