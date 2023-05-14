# Socket.io
Opens a stream to between the server and the client to hold
a continuous connection in a real time way.
With emitter events: we open a socket ready to listen to any
event emitted based on a pub/sub pattern.

Without websocket - polling would be a best way to get to know
if the client did request something based on an interval.



## Resources:
- final code provided by the course: https://github.com/odziem/multiplayer-pong
- MDN WebSocket Documentation: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
- WS: a Node.js WebSockets library - https://github.com/websockets/ws
- Native browser WebSockets API: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
- Emit Cheatsheet - https://socket.io/docs/v4/emit-cheatsheet/
- Pong game
	- Provided final code:  https://github.com/odziem/multiplayer-pong/tree/61f7c4ad191f9da96bdf2de49c37f5c62646ef32
	- Drawing Shapes With Canvas - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes 
	- Bonus: UML Sequence Diagrams - https://www.lucidchart.com/pages/uml-sequence-diagram#section_0
	- Code Steps:
		- 1. [server] Setting Server socket.io - https://github.com/odziem/multiplayer-pong/tree/b6a5487b1ab7260375d7e98fef7b9b19c6d57f21
		- 2. [client] Connecting socket.io - https://github.com/odziem/multiplayer-pong/tree/ff738f504be7df637f9457da0e0be13f1e7d75b2
			- CDN: https://cdnjs.com/libraries/socket.io 
		- 2. [server-client] Identifying connected client - https://github.com/odziem/multiplayer-pong/tree/8927645a5c0dcbd579b6f0cf346a567482dc481c
		```js
		// client
		socket.emit('ready');
		/** which is triggered a
		 * "connect" event
		 * - then the backend should listen for 
		 `io.on('connect')
		 - then the client should listen on the connect event which 
		 */
		```
		- 3. Listening for event on the server
		- https://github.com/odziem/multiplayer-pong/tree/3528dbba54df3cb5aa7e28a05941bea1cd3678fd
		- 4. Broadcast Events:  https://github.com/odziem/multiplayer-pong/tree/5f506eda6f7abb2784b567504c70b96330b20308
		- 5. Handling Pong events on the client:
		 https://github.com/odziem/multiplayer-pong/tree/cfcdfaf398558878128ca3eb0289b4453fe15f1b
		 - 6. Game Logic between server and client: paddle: https://github.com/odziem/multiplayer-pong/tree/cb01494626f3e0931b3ffd32d3776e3e0c24de7e
		- 7. Game Logic between server and client: ball and score
		https://github.com/odziem/multiplayer-pong/tree/9a2b5e9fc8c5598dad7691b09168b4db01a3b550
		- 8. Handle client disconnection: https://github.com/odziem/multiplayer-pong/tree/5af91bbb593377427dc0b7bb96f5b9ab4db4bb69



## Sockets:
Different kind of sockets: 

```
Network sockets __________________________________


					  IP sockets
					_______|______
					|			 |
			TCP Sockets		 Diagram sockets
		________|________
		|				|		
	WebSockets 		  *HTTP*


__________________________________________________

```

### WebSockets vs Polling
- WebSockets: 
	- client and server can send a request whenever it want to
	and the server will response whenever it receives
	a request ==> if nothing has been send for hours
	the requests are not made
	- opens a channel to allow real time data exchanges
	- binary directional communication

- Polling:
	- client requesting for update any x times: cost
	a lot of requests and sometimes not necessary requests
	```js
		let message;
		setInterval( async () => {
			message = await fetch('https://<API>')
				.then( data => data.json )
		}, 500);
	```

## WS package
A Node package allowing to use web sockets in a Node environment.
Indeed this package does only work for the server side environment,
where in the front hand we should rely on the browser native API 
[webSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

With WS and Websocket API: it is possible to open a channel between both
server and client side, however the web sockets API is not available or supported
on all browsers.
Note: both API (from ws and from WebSocket Browser API) are different.
```js
// server side
// npm install ws

const WebSocket = require('ws');

const ws = new WebSocket('ws://www.host.com/path');

	ws.on('error', console.error);

	ws.on('new message', (req,res) => {
		// emit a message from the server to the client
		ws.emit('custom-event', () => { /* ... */})
		// receiving a message
		ws.on('message', (data) => { /* ... */});

  ws.send('something');
		
})
```

```js
	// Create WebSocket connection.
	const socket = new WebSocket("ws://localhost:8080");

	// Connection opened
	socket.addEventListener("open", (event) => {
		socket.send("Hello Server!");
	});

	// Listen for messages
	socket.addEventListener("message", (event) => {
		console.log("Message from server ", event.data);
	});

```

## Socket.io
Is a feature having the same API, that can be installable for both server and client side.
Each package is downloadable individually for both environments
- `socket.io` for the back-end
- `socket.io-client` for the front-end

- Front End Differences

| Back End - Server | Front End - Client |
|-------------------|--------------------|
| - sockets allows user to communicate with anyone meaning communicating with multiple clients  |	- socket always send requests on the same server


HTTP POV: request are handled and sent back to the client that requested it

- Sockets can decide to which client to send the payload to:
- Server with socket.io has additional feature than the client
( capacities to send the payload to one client or broadcast to all clients at once )
- Uses Node Emitter events pattern.


- **Features**
	- `socket.emit`: sends to **the** client requesting.
	- `socket.broadcast`: sends to all clients but the sender.
	- `io.emit`: send to all clients ( including sender )


## Pong game with socket.io
Multiplayer game to create a ping pong game ( Natari-like ) using ZIP regarding UI and JS logic embed.
--> to create it from the ground: 20 project in JS.
cf: "Appendix: Pong Front End" section


- paddle: represents the platform on which the ball bounce back

- Project
	- all the `animate` function logic (beside the `renderCanvas`) can be moved to the server side
		- how to draw the games
		- and handles the player's moves

	- [ avoiding files modifications ] for instance, if a cheater wanted
	to win, she/he might change the file logic or score on its
	 favor if the files were on the client side / whereas having
	 them on the server side this could be avoided as the files are not editable ( the server would override any client file change ).
	 Disadvantage would be the server's performance with the bigger load.
	 Instead of just passing the data to the client side and dealing
	 with asynchronous input and output
	 Splitting the game's code between front end and back end 
	 can make it harder to debug and can end up with 
	 feature duplication
	 Hence the game play logic will be staying in the front end

	 - To keep track on player's turn, we will create a `referee`
	 expressing the reference to keep track of:
	 	- the ball position 
		- the direction and speed
		- the score
		and will send the data to the other player whenever there is an update.
		Making the `referee` to be considered as the source of truth of the game state.
	- Benefices of keeping all logic on frontend: 
		- lighter loads
		- opportunities to add more complex logic to be processed
		- support for multiple users ( clients ) at once.

- How this will work
	- [client] - the client will sent and `emit("ready", playerId)` to the server
	- [server] - once the client is ready ( receive the event ), it will respond
	with a `broadcast('startGame', isReferee )` event, setting one player being the referee.
	- [client] - will `emit('paddleMove', paddleData)` to the server and let it acknowledge the paddle position updates in real time
	- [server] - `broadcast('paddleMove', paddleData)` will allow the server to address the request and broadcast it back to all
	other players
	- [client] - the `referree` receiving the updates, will update the front end logic (` ballMove`) 
	`broadcast('ballMove', paddleData)`
	- [server] - receiving `ballMove` event --> will broadcast the update to all others clients.
	`broadcast('ballMove', ballData)`


	- Setting a socket BE.
		- install socket.io
		`npm install --save socket.io`
		- set packages json entry point
		`"entry": "server.js"`
		- instantiate a socket
		`const socket = require('socket.io')`

	- Setting socket FE.
		- install socket.io or use the CDN
			- `npm install --save socket.io-client`
			- `https://cdnjs.com/libraries/socket.io`
			(CDN to be **imported** before the project script file - otherwise this will not work.)
		- modify script: 
			- add a io constant ;
			`const socket = io('http://localhost:3000/');`
			- remove computer "AI" player - not needed anymore
				- `computerSpeed` variable instances
				- `computerAI` function
				- remove the same function from `animate`
				- enable back `renderIntro` function definition and 
	- Observing the implementation
		Test the implementation : open `index.html` on the browser ( for now )
		- inspector network : we can observe that the last request response's 
			- header: is the connection event where status code is changed by socket.io to switch the protocols ( http to ws)

	- XHR polling error: 
	```js
	// given solution - not working for me
	const io = require('socket.io')(server, {
		cors: {
			origin: `http://localhost:${PORT}`,
			methods: ['GET', 'POST']
		}
	});
	```
	```js
	const io = require('socket.io')(server, {
		cors: {
			/** includes url not being 
			 * localhost such as the file URI */
			origin: "*", 
			methods: ['GET', 'POST'],
			credentials: true
		}
	});
	```
	Double checks:
		- front end: io connected to the URL and  correct port
		- backend end: io connected to the URL and correct port
		- check cors issue: https://socket.io/docs/v4/handling-cors/

	- Identifying socket
	[client] `socket.id` provide a unique idea on each connection
	- Handling/Listening for Pong Event on Server
		- hook `ready` event to check if there
		is enough players to start the game
		- if yes: broadcast to all socket but sender the starting game event
		Note: listening to client event occurs only within a connection event
	-[server] Broadcast an event
	Two ways:
		`socket.broadcast.emit(<event>)`: to all clients excluding the sender 
		`io.emit(<event>)`: to all clients including the sender
	on broadcast connection made: client should start the game `startGame`: however the current code 
	implement more thing than it should to to be triggered --> refacto
		- rendering logic
		- game play
	-  Handling/Listening for Pong Event on Client
		- 1 paddle per player
			- paddle bottom = referee
			- paddle top the other = referee

	- Paddle Logic - server and client
	`broadcast('paddleMove', paddleData)

	- Ball and Score logic - server and client
	`broadcast('updateBallAndScore', { ballX, ballY, score })
		- adjusting the condition to play: which enabled to avoid having the UI stuck in a state of one player
		- not to 2 but to any even number:
		= any reconnection is able trigger all concerned clients
		- update client ballX, ballY and score.
	- Handling client disconnection:
		- if socket lost the connection try to reconnect
	
	- Using Socket.io with Express