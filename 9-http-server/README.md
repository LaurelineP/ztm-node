# CREATE A WEB SERVER

A web server is a method from `http` or `https` modules through
the method `createServer`.
There are 2 commons ways to create a server
**Https for now will not be used**

## 1. `createServer` expecting `requestListener` callback
- ``` const { createServer } = require('http')```
- `createServer` methods returns an instance of TCP | IPC Server.
It that can have an optional requestListener
This does not set up and get ready the server to be running! It
does just create the instance. ( `.listen` method will be the one
starting the server )


- `requestListener` is the function call back immediately added
	to the request and returning writable and readable streams
	- req: readable stream
	- res: writable stream
	NB: streams return buffer;

## 2. `req` and `res` ( the returned stream aka "`requestListener`" from `createServer` ):
- req stream is will return details from the website request
	- `req.url` will return the value about the path
- res stream will return a bunch of methods to process or return
	a response to the website
	- `res.end()` is mandatory to close the the connection for a
	specific path / also saying there are no data to return to the
	website


## 3. Routing will be handled by checking `req.url`
Routing will be handle in the readable stream `req` by 
checking the value of the property `url` --> `req.url`.
This one is returning a string corresponding to what is
written after your localhost:xxxx/ ( the first `/`).
From there you have to evaluate each element by yourself.

ex: For http://localhost:9000/friends/1, `req.url` will return
`/friends/1` that you will need to parse.

## 4. Bonus - personal practice: route getting the content of a file
The practice was to use the previously viewed notion about file system and the use of stream to readFile