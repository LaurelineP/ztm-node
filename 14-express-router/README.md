# Express framework:
Express is one of the mostly used web lightweight framework

## Create a server:
	```js
	const app = express();
	```

## Mounting a server:
		```js
	app.listen([ PORT ], <CB>)
	```

# Listen for specific requests:
Always at the very end
	```js 
	app[ < REQUEST-METHOD > ];
	// app.get('<PATH>', (req, res) => {})
	```

	- req and res:
	res.send() ends the stream and send back to the browser whatever you pass
	It will automatically recognize what you are passing as value and will send
	the adequate headers to your client
	( ex: you return a string, the header will have content-type: 'text/html' )
	( ex: you return an object, the header will have content-type: 'application/json' )

	Common pattern for naming your file would be **index.js** 
	however Node is build to do: naming your file "**server.js**" npm start without writing script
	will automatically run your file.

## Middleware 
Middleware are intercepted process between the request and the the request accessing the route / but it is also intercepted on the return way.
The next() execution tells the process to pass to the next stream.
- the code before the next() execution is to do actions on request stream
- the code after the next() execution is to do actions once the response stream as finished

## MVC
Model View Controller:
- Model: Data or DB
- View: Back-end project would be the API / fullstack would be Updated UI
- Controller: Router and logic

Structure wise you would have your project in which there are a bunch of files ( like 12-express-server )
MVC can be reflected to the project structure having a folder for each Letter of the acronym
- 1. Controllers: router organisation:
	- server will be using imported callback to handles the streams from the **controllers**
	- from server.js takes req and res returned value from the callback ( + all the logic )
		- copy them to controllers/<title>.controller.js
		- export the functions in order to import them 
- 2. Models: export all storing object / or DB ( warning: do not forget to handle the path changes )
- 3. Views: ... will come :) 
- Structure Project
	|__ README.md
	|__ server.js
	|__ package.json
	|__ package-lock.json
	|__ controllers (1)
		|__ <title>.controller.js
		|__ <title>.controller.js
	|__ models (2) 
		|__ <title>.model.js
		|__ <title>.model.js
	|__ view (3)
		|__ <title>.view.js


## Express Router
Small app managing your routes. Mainly used to break down the app.
The router can be organized within a "route" directory giving the following tree
- Structure Project
	|__ README.md
	|__ server.js
	|__ package.json
	|__ package-lock.json
	|__ controllers (1)
		|__ <title>.controller.js
		|__ <title>.controller.js
	|__ models (2) 
		|__ <title>.model.js
		|__ <title>.model.js
	|__ view (3)
		|__ <title>.view.js
	|__ routes (4)💥
		|__ <endpoint1>.route.js ( relies on model and controllers )
		|__ <endpoint2>.route.js ( relies on model and controllers )

- Create router: ```const <COMMON-ENDPOINT-NAMED-ROUTE> = express.Router()``` for each common endpoints
- Replace "app" requesting on same endpoint and replace "app" by your <COMMON-ENDPOINT-NAMED-ROUTE> router: 
- Create a middleware for each <COMMON-ENDPOINT-NAMED-ROUTE> router
- Grab every methods relative to an endpoint and create a file under routes/ for 	each endpoint	
	( export and import them into the server ) --> see 14-express-router
	- 2 ways: to handle every method routes url:
		- either declare to your server.js while instanciating your router the url it should match and make it relative within the route files
		- either declare the url into your routes file and make your server worrying about no first arguments ( url )