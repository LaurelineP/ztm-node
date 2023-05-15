
const { APIServer } 		= require('./APIServer');
const { listenSockets }		= require('./socketsServer');

const PORT 	= 8000;
const URL	= `http://localhost:${PORT}`;


/** [http] - Creates an HTTP server
 * post action: added express server as argument to the http server
 */
const HTTPServer = require('http').createServer(APIServer);


/** [socket.io - server] - Creates a socket.io server
 * - create a socket.io server ( handling the switching protocols from http to ws )
 * - adds cors configuration to authorized your sever requests connected to the html file
 * (once set the socket io on the client side)
 */
const socketsServer = require('socket.io')(HTTPServer, {
	cors: {
		origin: "*",
		methods: ['GET', 'POST'],
		credentials: true
	}
});


/** [server] - self launching server */
(
	function launchServer(){

		/** [http] - Launches server  */
		HTTPServer.listen(PORT, () => {
			listenSockets(socketsServer);
			console.info(`\n🔸[ server ] - Listing on ${URL} ...`);
		});
})()
