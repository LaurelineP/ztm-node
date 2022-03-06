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