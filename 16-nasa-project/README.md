# Nasa Project

## Structure and Architecture a project
Tools:
- Makes diagram - meant to structure the app flow and idea/
breaking down important action
	- lucid: https://www.lucidchart.com/pages/

Using the provided NASA folder: we will just walk through the project in order to have an idea.
- add client folder
- add server folder

- in client folder there will be the entire themed project
- in the server this will be to build our server and API
## Start coding:
- server.js
	1. Variable with port
	2. Build server
		*We know about creating server using http or express/ we can create a server 
		using http and using express as middleware*
		```js
		const http 		= require('http');
		const http 		= require('express');
		const app 		= express();
		const server 	= http.createServer( app );
		```
	Every routes handled using app will be provided to the server. 
	Allows to separate the express use within its own module
	--> create server/app.js
	3. Take all the related app and express code to be handled within this file
	and export those

Building server like 16-nasa-project/server/server.js helps in receiving other type of
connections ( like websockets )

## Environment variables
- on Windows ( within command )
	- "start": "set PORT=5000 && node src/server.js"
- on Mac ( within command )
	- "start": "PORT=5000 node src/server.js"

Having both client and server within the same project serving into different port creates CORS issue in the browser.
cross-env: handling variable for both platforms
https://www.npmjs.com/package/cross-env

What is an origin:
	 is protocol: http
	 is hostname: localhost
	 is port: 9000

Cross origin requests: requests sent from an origin to another  
By default browser block cross origin requests 
