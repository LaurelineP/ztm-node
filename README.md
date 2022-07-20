
# NODE
Node is an asynchronous event-driven javascript runtime meaning is good to handle asynchronous things ( including to process those in parallel )

  CPU is running the javascript, the non blocking functions will be delegated to other specific element ( network )



## PROCESS
Process module is a Global object to node providing information about and control over the current Node process.

1. ```process.argv```: array of node installation path
- returns an array containing the command path

2. Difference between JS in chrome vs node
GLOBALS
- Node has the global object ( global.process.argv === process.argv )
- Chrome has the window object ( window.console.log() === console.log )

| NODE | CHROME Browser|
_________________
| global | window |
| process | document |
| modules |history | 
| __filename, __dir | location |
| require	| navigator import |
| runs modules and server | reads html js css |
 

 3. WHATWG: community ( apple and mozilla ) responsible for standard in browsers
 Acronym: __*Web Hypertext Application Technology Working Group*__

## BACK-END VS FRONT-END
- generally servers to build web app, website, mobile or desktop app
- read and write files
- provides users data
- connect to databases
- servers provides authentications

Front End is what you see as users into what we call **client** - this represents
the navigator / the browser.


## HTTP/HTTPS: protocol in which front end and back end communicates to provide / receive data
in xml, json, txt 

- Why requesting data from back end if we can store all data in front end ?
	- backend is meant to handle certain concept the front end cannot or should not process
	such as security for instance


- What does nodejs do ? 
	- exploit the entire engine v8 
	- read write file
	- catch argument in command
	NODE JS API --> files interaction, crypto etc
	- + natively some javascript

## UNDERNEATH NODE
- V8: Google's engine written in C++ allowing to have JavaScript to the back-end 
- NODE JS Binding -> when some of the api are wrote in 
lower language --> there is a binding to those api --> 

- LIBUV ( operating sys ) ( input and output written in C++ ) - client for node to delegate few 
tasks / things to work with the website contents for instance
Those Libuv does handle the code either for linux, window etc 
 JS -> Node ( JS engine -> node API -> node binding -> libuv ) -> serve front end 

FACT: Nodes is best in async IO

### Node internals deep dive
NodeJS: 	https://github.com/nodejs/node
Libuv: 	https://libuv.org/



### DEEP DIVE LIBUV
The last toolchain member of node environment process
- Node let us use libuv through the node.js bindings 
( allowing to access lower languages features )
- libuv can bind to other programming languages 
https://github.com/libuv/libuv/blob/v1.x/LINKS.md

- handling differences between OS
https://github.com/libuv/libuv/tree/v1.x/src
	- unix ( linux, debian, darwin ( MacOS ) etc )
	- windows ( linux, debian, darwin ( MacOS ) etc )



## SYNCHRONOUS VS ASYNCHRONOUS

- asynchronous meaning: opposite of synchronous:
code that does not necessarily run line by line 
running diff things at the same time 

- synchronous meaning:
code that reads code lines one by one
does things step by step

FACT: Nodejs is really good as handling asynchronous without blocking the front end


- IS JAVASCRIPT ASYNCHRONOUS OR SYNCHRONOUS
Javascript is **SYNCHRONOUS**: *running line by line*
The asynchronous part is due to features from the browser or from the engines themselves - not the proper javascript language approach.
Thanks to libuv: functionalities that don't belong to the proper core of JS, javascript can behave asynchronously


- MULTI-THREADING PROCESSES THREADS
	- Is node js multi threaded ? **YES**
	Ex: the more we have cores in computer the more we
	gain in performances ( more expensive machines, more desirable )
	--> Then the more we have threads the more we can be efficient code wise


	- What are threads and how do they work ?
	Threads are the way we take advantage of a machine's multiple cores:
	*hence speed and performance* - to run the program faster

	Thread is a self-context container running asynchronously ( can be run in parallel and do not block regular js executions ) **
	EX:
	Every program currently executed are processes ( even node running is within the main process). A process is a thread machine wise.
	- how does node do it? 
		- what happen when you run a process ?
			- Processes are containers:
				- code == is a process to do: process contains your code which lives in the memory of that process
				Basically a process is something that is asked to run in parallel representing a single sequence of operations ( like functions )
				- threads are instantiated with sequences of task
				A code might instance/create new threads.
				- call stack: these sequences lives in the call stack ( finishes function executions defined ).
				We can represent the call stack as a container that keeps track on
				functions calls order and their process as long as they are not done.
				Once done these functions will be removed.

				**deadlocks** happen in multi threading programming --> if not resolved the thread remains running

				How Node allows us to do handle multi-threads and allow JS 
				programming language to do that? *( knowing being synchronous )*
				( blocking function will block the process of your initial code ) thanks to **EventLoop**.

				LIBUV handles async I/O ( file system and network )
				Each time we run async functions or code --> these goes to the event
				loop ( also a context registering function ordered execution that should be resolved in order to process the second )

				- **file system** relates to **thread pool**
				- **network** would be delegated **to the browser**
				--> Saving the CPU to process all that.

				- 4 limited threads ? ( mentioned 4 threads)
				Node knows what needs to be done regarding threads,
				this is why the dev doesn't need to worry about how to
				write which code to which thread.


## THE EVENT LOOP
- responsible to handle all callback functions and runs threads
- **callback queue** ( == message queue term, event queue term): how the event in event loop are manages
	- when Node executes async functions --> these operations are executed in 
	the background ( operating sys or thread pool for instance )
	The Organization concept is FIFO ( First In First Out ) queue
	which allow to saves the async chunk in the order that is has been called

- how event loop handles 
7 event loops /  -> several phases used by developers ( 4 )
	- timers ( == processed first phase  )
	- I/O callback and bounded callback ( == poll queue ) ( == processed second phase )
	- setImmediate phase ( execute after io phases ) executed before another event loop is processed
	- close callbacks phases ( close files or network connection )
	_________________________ 
	Others exist but its under the hood of nodes

	Event Loop runs another cycle again and so on

	--> 3 times of timers function
		- setTimeout --> triggered after a delay
		- setInterval --> triggered several time based on delay provided
		- setImmediate --> special kind of timer specify the event loop to runs it ASAP



## COMPARING NODE WITH PHP AND PYTHON
	- Node in the ecosystem
		- C and C++ ( low level language ) have the threads features
		- PHP Python ( high level languages ) --> easy to use and single threaded programming languages ( so JS )
		- NODE ( JS in Node running time - high level language )

	Think back in the day:
		- PHP and Python were using more traditional model where they needed web server like Apache.
		Apache was blocking so needed threads
		Each client talking with the server would be into a new thread
		Lot of traffic ( connection ) with Apache would crash quickly.

		2009 Node came with its model of non blocking I/O
		--> clearing by queuing in event loop by delegating the majority of the work ( no need to additional server )

		Today: non blocking IO are standardized
		We can put a server like Apache and NGINX of front with node server ( handling on thousand concurrent )


## WHEN IS USING NODE THE RIGHT CHOICE ? WHAT IS NODE.JS BEST AT ?
				CPU
		/					\
NETWORK CARD			OPERATING SYSTEM
							HARDDRIVES

More optimized in certain situations:
Node is not good at:
	- video processing ( blocking processors heavy computation )
	- machine learning ( blocking processors heavy computation or GPU )
	Its possible but will not add more advantages

Node is good at:
	- SERVERS and various things that servers do
	when communicating with others servers or services on the web / also database ( emails notification )
	- Good at I/O and serving data ( most what we do in web ( video streaming like netflix mainly input and output - node sends video files to  from DB of videos  through a server like node and into the web browser or netflix app ))
	DB, web various services --> node was made for modern web


## OBSERVER DESIGN PATTERN
Event driven has been taken for granted
What does it mean for us to react on event loop.
Observer design pattern are proven approaches to resolves problems.
Observers subscribe to events in order to know whats its occurring and may react to them.
When an events occurs --> the subscribed observers are bounded to that events : meaning every events occurring ( if subscribed ) the observer will be in the loop

## EVENTS
The node event emitter
see file 1-events.js

## MODULES
Module = well made functionality.
NPM is a collection of modules called packages.
Module are files whereas packages is a collections of modulated files.


Why use modules
1. reuse executing code
2. organize your code
3. expose only what will be used in other file ( strict necessary )

### 3 ways to write modules
- modules export/imports files: using default and most common way:
	**./3-modules**
	- have files with js extensions and others
	- import with variable syntax and require(<package-name>)
		<code>const fs = require('fs')</code>
	- export your functions
	( <code>module.exports = {...}</code> || <code>module.exports.<your-module> = {...}</code>)
- modules with ES6 keywords "import" with .mjs files extensions
	**./4-modules-mjs**

- modules through structured folder
	**5-modules-index-file**
	- having a parent folder with your module name
	- in which there is index.js importing/exporting everything you need from t ( common usages )
	- siblings level files are reusable function separated by concern


## NPM, NODE-MODULES PACKAGE.JSON, PACKAGE-LOCK.JSON
Glossary:
- <code>npm</code> is the acronym for Node Package Manager that is hosting packages to install
	and it's has a CLI which allows to manage and install those packages.
- <code>package.json</code> is the generated file from the init CLI command listing project's deps
	and few configuration for your project development ( main, license, scripts, ...)
- <code>node_modules</code> is the generated folder listing your packages ( and their deps )
installed to your project
- <code>package-lock.json</code>: exhaustive list of dependencies versions and their resolutions



## HTTP AND HTTPS PACKAGES
Those are built-in modules from NodeJS and meant to create servers
- Those modules works with synchronous handling ( not promised base )
however they do work with streams ( writable - REQ, readable - RES streams )

### STREAM LISTENER ( POST / PUT / DELETE )
```<SERVER-STREAM>.on()```
using the ```.on()``` listener is to listen to a specific process to the stream
Every stream inherit from that listener as long - as long as we know the process flow.
- ```server.on( 'request', (req, res) => {} )``` ==> to receive any data sent to the server
- ```req.on( <EVENT-STRING>, <EVENT-DATA> => {} )``` ==> within a stream you can listen to processes
	- ```req.on('data', data => {})``` handles the data the client would like to process through the server
	- ```req.on('error', error => {})``` handles the error data caught
	- ```req.on('end', () => {})``` handles the closing process

### REQ: ( request ) readable stream
req is a readable stream: able to read from the client side ( browser )
and helps in :
- req.on()		: establishing listener to the ```req``` stream ( for this case )```
- req.method() 	: holds the request method value : ```// GET ( or else )```
- req.url		: holds the entire url value to parse to get endpoints:	```// "http://localhost:9001/friends"```
- req.body		: holds the posted value from the browser ( using http/http modules within an 'data' event )
	buffer needing to be process using the
	Buffer.method ```.toString()```:	

### RES: ( response ) writable stream
res is the writable stream: to write back to the browser.
It responses using the following
- writing status code and headers are mandatory in order the
browser is able to handle the response.
- res.setHeader() 	: to set request header ( ex: content-type)
- res.statusCode 	: to set response status code ( ex: 200, 404 etc )
- res.write()		: to write more consequent text to the browser
- res.end()			: to end the request process and it is possible to add a text within
- req.pipe()		: to automatically close stream and returning a response to the browser
					Commonly used on POST request piping back the answer.
					This is a good practice as it can avoid the client-side to make another request
					to get this very data / or you can also use the updated object back ( this last practice
					seems to be more common with PUT || PATCH ( update protocols ) than POST ( create protocol ))


## API TESTING TOOLS
Api platforms are meant to help you test your endpoints and API routes.
Lets you use any request method and lets see show you how your server is
answering back.
- PostMan: https://www.postman.com/ ( tests rest and soap api )
- Insomnia: https://insomnia.rest/ ( Leaner, less configurable (?))

[ SOAP - REST - GRAPHQL ]: https://www.altexsoft.com/blog/soap-vs-rest-vs-graphql-vs-rpc/


## EXPRESS SERVER
Express is a lightweight package managed by LoopBack,
leaner and cleaner in handling requests than http or https modules.
Using http and https is fine but constraining whereas using
Express is robust and avoid anyone to handle every tricky
elements about requests.
( Ex: http://localhost:9001 and http://localhost:9001/ - 
The extra "/" can make the server fail if not handled properly 
using http or https modules whereas express does )

### BASIC FEATURES
Express provides few common handy features such as:
- auto send headers to browser
- ...res : all the usual streams from http and https modules streams
- and some special to express:
	- res.send() => close stream and can send back response to browser ( including Headers )
	- res.json() => close stream and transform data to json ( including Headers)

### OPINIONATED FEATURES
- req.params: handling the requested data from endpoints with endpoint followed by "/" + colon and variable placeholder
	ex:
	- browser url pattern	: <PROTOCOL>://<DOMAIN>[<PORT>]</PORT>/<ENDPOINT>/<REQUESTED-DATA>
	- browser url			: 	http 	://localhost:9001		/friends	 /0
	- express API def. pttrn: 	app.get("/<ENDPOINT>/:<DATANAME>",(req, res) => {})
	- express API def. 		: 	app.get("/friends	/:friendID ",(req, res) => {})

### EXPRESS VS KOA VS NEXTJS
All those tools are routing focused 
- Express is managed by LoopBack ( proposing a StrongLoop framework solution based on Express )
	Express relies heavily on callback system with a synchronous approach ( do not handle asynchronous )
	Allows to use middlewares
- Koa is created by the same author who did express but with a bigger set of tools as it is more opinionated.
	Koa has a different approach than his big brother: its handling asynchronous therefore is promise based
	Goal was to be more modular than express in order to be able to reuse middlewares between projects
- NextJS is a framework simplifying the React based project integration by proposing an opinionated routing
 approach and also provide SSR ( working with the backend environment this is why CSR is not a concern / however, what about SSG ? In any cases NextJS covers those 
 3 aspects ( SSR, CSR == SPA, SSG )

- mounting the server : ```const server = express()```
- define routing : ```server.[ get | post | put | patch | delete ](( req, res ) => {})```
- define a middleware: ```server.use(< MIDDLEWARE >)```


### EXPRESS MVC
MVC : model view controller
Model being Data / DB
View: would be backend wise the api or front end routes(s)
Controllers: back-end router.

### EXPRESS ROUTER
Router is meant to organize the routes / being like a small app.
It can be organized within a routes folder in which you define files based on endpoints
- create a router : `express().Router` for each endpoint being under the same `req.url`
- gather every requests made into module files to define into each router  
- set your router up high with the middleware (`app.use(...)`)

### REST PATTERN
- endpoint naming: better having them in plurial nouns == also called collections
( on PostMan: we registered our endpoints with plurial nouns under a "Collections" Tab )
- id of item

### What makes an API RESTful?
Those following a pattern regarding https request
Acronym stands for
- REpresentational
- State
- Transfer

Roy Fielding did help creating rest design: https://www.youtube.com/watch?v=6oFAmQUM8ws&ab_channel=RohitKhare
Follow a bunch of best practices 
Representational and State are both referring to how the server
makes your data available
The Transfer talks about how the response is sent back to the client.
General idea behind it to heavy use the existing standards on the web ( HTTP, JSON, URL ) ( NB: Roy is also responsible for the HTTP standard )
- URL: are address used to get accessed to any need
- HTTP: the protocol handling the URL
- JSON: being one of the standard to transfer data

- Endpoints are collections of data
- Use GET POST PUT and DELETE
- Our requests are both **stateless** and **cacheable**
Stateless: ref to each request is separate and not connected to any state on the client that is not included into the request so, the server is not tracking any request made from client - **only keep track on data in our collections**
Opposite of stateless would be to track requests from front-end and the session - which sticks around between the request to the server ( ex PHP is tracking every requests in session-variable )
The request being stateless means that those can be cached
by saving the result into the server.
We only need to track the data within our collections

Looking back at our Postman API:
we could have created endpoint with verbs ```http://localhost:9000/createNewFriend
--> **This is called "Remote Procedure Calls"**
*Before, the server and client were communicating that way with remote procedure call
--> front end asking for the server to do an action ( createNewFriends ) with the 
entire body formatted from the front end: in order to return data.
Ignoring the truth of the fact that client and the server are 2 separate machines

### Common errors while routing and their meaning:
- ```[ERR_STREAM_WRITE_AFTER_END]: write after end```: error is raised because the writable 
stream res has been closed before being able to execute the next lines that want to also
 write back to the client --> move your res.write above the stream closing execution ( req.pipe, res.end, res.send, res.status(xxx).json(), res.json() ).
- ```[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client```: error
raised because the statusCode should be on top of your logic block ( before writing back any 
answers to the client and you did the all way around --> move your statusCode setting 
( res.status(), before anything else ))
- NOTE: If a case scenario from the client to server communication is not handled : 
the server will crash.

## SERVING WEBSITE WITH NODE
All a website is the files nested under the public repository.
This is where ```express.static(<PUBLIC-DIR-PATH>``` method helps.
This would provide the client ( browser ) the availability of serving any files
under that server.
If you have any kind of files ( mypage.html, picture.jpg, ...); those would served 
under the browser url being: ```http://localhost:9001/mypage.html```
This should be set as a middleware.
```app.use(express.static('public'))```
( relative path resolution by default: relative from where the server has been launched.
if a serer is launched from this 14-express-server-MVC-router, the server relative root ref is './' therefore 'public' is interpreted as: './public' and would properly serve
the directory
 )
( counter the relative auto resolution would be to use ```path``` module as follow: 
```path.join(__dirname, 'public' )```
if a server is launched outside of this 14-express-server-MVC-router without path.join
the previous files accessibility from public would not be resolved as the root ref for your server is where the command is executed ( at this point ./ is would refer to: ```../14-express-server-MVC/``` )
Using your path.join(__dirname, 'public') will ensure that server will always relies on its context path.
)

NB: 
- when this middleware is not set: accessing the previous url into the browser would
respond with a a next() and an error message ( express automatically handles this ).
*When a file is not found, instead of sending a 404 response, it instead calls next() to move on to the next middleware, allowing for stacking and fall-backs.*
The client page with display:
"Cannot GET /mypage.html" but will not cause your server to crash 🙌
- When the middleware is set: accessing the previous url will be enabled and can let the
server serve the available static pages
	- Trying to serve other directory than "public" ex "routes" and this did not work
	probably because we need to provide options

Serving files from public instead of serving back data is not RESTful.
Being a RESTful api does not necessary means you cannot serve files - that's ok and common.

If you expect to receive tons of connection: serving your files from the server will not be
in your benefit: a good way to do that would be to serve those static files from a
**Content Delivery Network ( CDN )** in order to let people being served easily and fastly
Examples: 
- Akamai: https://www.akamai.com/our-thinking/cdn/what-is-a-cdn
- Amazon CloudFront: https://aws.amazon.com/cloudfront/features/

### TEMPLATIG ENGINES:
Templating Engines are tools enabling us to dynamically inject js variable within ( using interpolation ) the template which is then transform
as HTML
Example:
- EJS, 
- MustacheJS,
- HandleBars
...

#### INSTALL AND SET TEMPLATE ENGINE
https://expressjs.com/en/resources/template-engines.html
Install handleBar
```npm install hbs```

Set your server to use handlesbar
- server.js:
	- set engine: add beneath express server creation ```app.set('view engine', 'hbs')```
	- set where the engine will look for templates by creating a folders and refers it to server
	```app.set('views', path.join(__dirname, 'views'))```
	- Create a file underneath with extension ```hbs```
	- Add interpolations into this hbs file
	- Serve the appropriate file to the path using within a get request
	```res.render("index", <OBJECT-WITH-VARIABLE>)```


#### LAYOUTS AND SEPARATION OF CONCERNS
```views/layout.hbs```
Layout is a template used for every regular templates
You refers to other file using ```{{{body}}}```


#### CONCLUSION
At the end REST helps in separating concerns and helps us creating a better structure within our project
( MVC for instance ) using standard protocol ( http )
Note: Front-end are often made ahead of the back-end.
The front-end usually needs to be modified after implementations on the back-end;
because it is difficult to forsee the constrains or even implementations choices the front-end can encounter
## STRUCTURE / ARCHITECTURE
|__client/
|__server/
	|__routes/
		|__controllers/
		|__models/

#### Multiple node_modules
It is common to have multiple node packages for the different part of
our application ( client folder and server folder )
- one for the client
- one for the server
- even one at the root of our project folder
( wrapping the 2 packages for the server and for the client )

## FRONT-END DASHBOARD
SCI-FI UI framework : https://github.com/arwes/arwes
- Build dual structure under the same project directory:
	- client/
	- server/
	in which there is in both **node modules** installed.
- Created server with http and app ( express use within param of http module)
- Applied MVC for the rest API initialization 
	- data access functions through models views controllers regarding the API
	part of the **Layered Architecture** itself part of SoC ( Separation Of Concern design )

### POST data received validation
Validation on a post request is to check the expected payload details.

## TEST && TESTING API
Generally in tests they are 3 kind of tests
- **UI tests**: testing interactions
- **Service / API layer tests** ( can be called **integration tests** ): 
tests going through all the requests process ( received request through middleware, 
the actual response of a request, the returned value )
– can tests diff unit tests together or components when connected together 
- **Unit tests** : testing in isolation ( one function doing one thing in an 
isolated way )

Testing include different toolchain working together:
- **test runner** : tool that will find your tests in order to run it
- **test fixtures**: tool describing how the test are organized by modules
and by the individual test.
__Each fixture can run its own environment__
- **Assertions**: tool ( function ) checking the expectations out of the code ( *expect()*)
- **Mocking**: tool allowing us to emulate functions - in the example of testing 
a BDD, it would not be great to affect the data while testing them: this is were 
mocking those takes place - it will prevent to affect ( at least temporary )
your data.

------ NOWADAYS: JEST DOES THAT -------
## SuperTest - Library to test http requests
https://www.npmjs.com/package/supertest



## IMPROVE NODE PERFORMANCE
- Reminder: JS is a single threaded programming language, meaning it is executed line by line and 
can freeze the browser ( navigator )
- Node is a JS runtime 
- Node Server receives requests, Node will process it using Event Loop then will send back to the client
the response. The Event Loop is great in handling multiple process by taking advantage of the threads
avoiding any code blocking


### Building A Simple Blocking Server
In order to understand how to improve performances issues we need to understand how we might run onto
performance issues.
