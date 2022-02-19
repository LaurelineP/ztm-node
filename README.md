
# NODE
Node is an asynchronous event-driven javascript runtime meaning is good to handle asynchronous things ( including to process those in parallel )

  CPU is running the javascript, the non blocking functions will be delegated to other specific element ( network )



# Process
Process module is a Global object to node providing information about and control over the current Node process.

process.argv: array of node installation path
- returns an array containing the command path



/**
 * 2. Difference between JS in chrome vs node
 * GLOBALS
 * - Node has the global object ( global.process.argv === process.argv )
 * - Chrome has the window object ( window.console.log() === console.log )
 * 
 * | NODE | CHROME Browser|
 * _________________
 * | global | window |
 * | process | document |
 * | modules |history | 
 * | __filename, __dir | location |
 * | require	| navigator import |
 * | runs modules and server | reads html js css |
 */

/**
 * 3.
 * 
 * WHATWG: community ( apple and mozilla ) responsible for standard in browsers
 Acronym: Web Hypertext Application Technology Working Group
 */

/**
 * Backend vs front end is the back stage / what's happen underneath
 * How node is mostly users
 * - generally servers to build web app, website, mobile or desktop app
 * - read and write files
 * - provides users data
 * - connect to databases
 * - servers provides authentifications
 * 
 * Front End is what you see as users
 * 
 */

/**
 * HTTP/HTTPS: protocol in which front end and back end comminicates to provide / receive data
 * in xml, json, txt 
 * 
 * Why requesting data from back end if we can store all data in front end ?
 * - backend is meant to handle certain concept the front end cannot or should not process
 * such as security for instance
 */



/**
 * What does nodejs do ? 
 * - exploit the entire engine v8 
 * - read write file
 * - catch argument in command
 * NODE JS API --> files interaction, crypto etc
 * + natively some javascript
 * 
 * NODE JS Binding -> when some of the api are wrote in 
 * lower language --> there is a binding to those api --> 
 * 
 * LIBUV ( operating sys ) ( input and output written in C++ ) - client for node to delegate few 
 * tasks / things to work with the website contents for instance
 * Those Libuv does handle the code either for linux, window etc 
 *  JS -> Node ( JS engine -> node API -> node binding -> libuv ) -> serve front end 
 */

/** Nodes is best in async IO */

/**
 * Node internals deep dive
 */


/**
 * NodeJS: 	https://github.com/nodejs/node
 * Libuv: 	https://libuv.org/
 */

/**
 * DEEP DIVE LIBUV
 * The last toolchain member of node environment process
 * - Node let us use libuv through the node.js bindings 
 * ( allowing to access lower languages features )
 * - libuv can binds to other programming languages 
 * https://github.com/libuv/libuv/blob/v1.x/LINKS.md
 * 
 * - handling diff os ( code differents )
 * https://github.com/libuv/libuv/tree/v1.x/src
 * - unix ( linux, debian, darwin ( MacOS ) etc )
 */


/**
 * SYNCHRONOUS VS ASYNCHRONOUS
 * 
 * - asynchronous meaning: opposite of synchronous:
 * code that does not necessarily run line by line 
 * running diff things at the same time 
 * 
 * - synchronous meaning:
 * code that reads code lines one by one
 * does things step by step
 * 
 * Nodejs is really good as handling asynchronous without blocking the front end
 */

- ASYNCHRONOUS CALLBACKS



- IS JAVASCRIPT ASYNCHRONOUS OR SYNCHRONOUS
Javascript is SYNCHRONOUS : running line by line
The asynchronous part is due to features from the browser or from the engines themselves - not the proper javascript language
Thanks to libuv: functionalities that don't belong to the proper core of JS, javascript can behave asynchronously


- MULTI-THREADING PROCESSES THREADS
	- Is node js multi threaded ? **YES**
	Ex the more we have cores in computer the more we
	gain in performances ( more expensive, more desirable )
	--> Then the more we have threads the more we can be efficient code wise


	- What are threads and how they works ?
	**Threads are the way we take advantage of multiple cores hence speed and performance - to run the program faster**

	**Thread is a self-context running asynchronously ( can be run in parallel and do not block regular js executions **
	EX:
	Every program currently executed are processes ( here node is executed therefore this is a ), a process is a thread machine wise
		- how does node do it? 
			- what happen when you run a process ?
			( executable running for instance and here
			in our case: Node )
				- Processes are containers:
					- code == processes to do : process contains your code which lives in the memory of that process
					Basically a process is something that is asked to run in parallel representing a single sequence of operations ( like functions )
						- threads instanciated with sequences of task
						The code might instance new threads
							- call stack: these sequences lives in the call stack ( finishes function executions defined )

						deadlocks happen in multi threading programming --> if not resolved the thread remains running

						How nodes allowed us to do handle multi-threads	and allow js to do that. ( blocking function will block the process of your initial code ) thanks to EventLoop.

						LIBUV handles asynch I/O ( file system and network )
						Each time we run async functions or code --> these goes to event loop ( also a context registering function ordered execution that should be resolved in order to process the second )

						- file system relates to thread pool
						- network would be delegate by the browser
						Saving the CPU to process all that

						4 limited threads ? ( mentionned 4 threads)
						Node knows what needs to be done regarding thread therefore the dev don't need to worry how to write the code to which thread


THE EVENT LOOP
- responsible to handle all callback functions and runs threads
- callback queue ( == message queue term, event queue term): how the event in event loop are manages
	- when node execute async function --> this operation is executes in bg ( operating sys or thread pool )
	First in first out queue 
	Saves in order the async code  

- how event loop handles 
7 event look 
	-> several phases ( 4 ) by developpers
		- timers ( == processed first phase  )
		- I/O callback and bounded callback ( == poll queur ) ( == processed second phase )
		- setImmediate phase ( execute after io phases ) executed before another event loop is processed
		- close callbacks phases ( close files or network connection )
		- - -  
		Others exist but its under the hood of nodes

		Event Loop runs another cycle again and so on

		--> 3 times of timers function
			- settimeout --> triggered after a delay
			- setInterval --> triggered several time based on delay provided
			- setImmediate --> special kind of timer specify the event loop to runs it ASAP



- COMPARING NODE WITH PHP AND PYTHON
	- Node in the ecosystem
		- C and C++ ( low level language ) have the threads features
		- PHP Python ( high level languages ) --> easy to use and single threaded programming languages ( so JS )
		- NODE ( JS in Node running time - high level language )

	Think back in the day:
		- PHP and Python were using more traditional model where they needed web server like Apache.
		Apache was blocking so needed threads
		Each client talking with the server would be into a new thread
		Lot of trafic ( connexion ) with Apache would crash quickly.

		2009 Node came with its model of non blocking I/O
		--> clearing by queuing in event loop by delegating the majority of the work ( no need to additional server )

		Today: non blocking IO are standardized
		We can put a server like Apache and NGINX of front with node server ( handling on thousant conccurrent )


# WHEN IS USING NODE THE RIGHT CHOICE ? WHAT IS NODE.JS BEST AT ?
				CPU
		/					\
NETWORK CARD			OPERATING SYSTEM
							HARDDRIVES

More optimised in certains situations:
Node is not good at:
	- video processing ( blocking processors heavy computation )
	- machine learning ( blocking processors heavy computation or GPU )
	Its possible but will not add more advantages

Node is good at:
	- SERVERS and various things that servers do
	when communicating with others servers or services on the web / also database ( emails notification )
	- Good at I/O and serving data ( most what we do in web ( video streaming like netflix mainly input and output - node sends video files to  from DB of videos  through a server like node and into the web browser or netflix app ))
	DB, web various services --> node was made for modern web


# OBSERVER DESIGN PATTERN
Event driven has been taken for granted
What does it mean for us to react on event loop.
Observer design pattern are proven approaches to resolves problems.
Observers subscribe to events in order to know whats its occuring and may react to them.
When an events occurs --> the subscribed observers are bounded to that events : meaning every events occurring ( if subscribed ) the observer will be in the loop

# EVENTS
The node event emitter
see file 1-events.js

# MODULES
Module = well made functionality.
NPM is a collection of modules called packages.
Module are files whereas packages is a collections of modulated files.


Why use modules
1. reuse executing code
2. organize your code
3. expose only what will be used in other file ( strict necessary )



## 3 ways to write modules
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



