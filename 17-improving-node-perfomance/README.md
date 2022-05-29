### Building A Simple Blocking Server
In order to understand how to improve performances issues
 we need to understand how we might run onto those.

- Create a blocking server
	- using express create a server
	- set's 2 routes
		- '/': regular page so far
		- '/timer': where we will return a blocking behavior with a timer using while loop base on **date** and **duration**
- [ CHROME INSPECTOR NETWORK ] observing time to handle the request
	- IDENTIFY THE BLOCKING BEHAVIOR in "/ timer"
	servers handle multiple connections; our server serves
	this "/timer" route which is purposely meant for
	blocking the event loop while processing the delay
	function.
	(not involving the network " (v8) neither Files (Libau)
	this is handled by the event loop that does not
	delegate js task by default → rel: stream
	a process maybe?).
	- UNDERSTAND HOW THE EVENT LOOP is BLOCKED. '
	Beside having seen the'/timer' route is taking
	minimum 9sec → this following practice will
	help you better understand how in everyday life
	this could be painful.
	→ Opening multiple '/ timer' tabs and observe.
	> open browser L go to
	> open a tab 2 go to the same URL
	> open your inspector/ network for both tabs
	> when you are ready to observe do quick
	refresh on both tabs.

	- FINAL OBSERVATION
	As suggested w/ prior description, here we are able
	to experience the server being blocked by the
	the event loop tasks.
		- first tab refresh on '/ timer' will execute the code
		- second tab refresh quickly after the first one, is
			executed
			↳ Both table are pending →
			↳ the first is processing for those 9000 ms.
			and cannot do other task until this
			execution is complete
			↳ the second is also requested to process
			the very same task.
			↳ Event loop is stacking the task in the
			order of when the requests have been
			made (FIFO)
		→ ~9 SECONDS LATER
			- first tab is not pending anymore ✗ server
			has completed this first request
			- second tab is still pending: why? because
			the server was blocked processing the first
			task, it's only THEN it could process the
			second Request.

			---------------------------------------
			<TIME WAITED FOR 1St TASK TO COMPLETE>
							   +
					"DELAY" FUNCTION TIME"?
			---------------------------------------


### Blocking functions
4 Examples of blocking functions.
- Json: few ms.
	- JSON.stringify
	- JSON.parse
	- Array.prototype.sort - Js sorting array methods.
	- Crypto builtin module's methods: ( key derivation functions)
	↳ pbkdf2 method
	↳ scrypt method
Resources: "Response-time:3 important limit user perception"
https://www.nngroup.com/articles/response-times-3-important-limits/
- 100ms == 0.1s	: user perception feel the system is reacting
instantaneously [IDEAL].
- 1000ms = 1s : about the limit of the user's flow
of thoughts
- 10000ms = 10sec : about the limit of keeping the user's
attention-focused. with the desire of wanting to do something meanwhile,

"speed matter" - https://www.speedcurve.com/blog/web-performance-monitoring-user-engagement/

### RUNNING MULTIPLE PROCESSES (explanation)
Best way to solve a problem is to divide into smaller
chunk.
Best way to deal w/ overloaded server (w/ too much work)
↳ divide ↳ spread the load
Note: Node can have multiple processes, side by side,
allowing them to work for a common task.

In node we are handling multiple Requests →
we can spread our requests out into multiple
processes that each respond to the request the same
way.
Each have a copy of our server code and are
working together in parallel. - sharing the load equal y
this technique is an alternative to multiple threaded
application within a single threaded App. using all
the CPUs. in your machine -
"speed matter" - https://www.speedcurve.com/blog/web-performance-monitoring-user-engagement/

### Cluster
Cluster built in module creates processes to de-load the main process to handle too many requests.
Also it could be a first approach to load balancing before pm2 that we will see later on.

- ```const cluster = require('cluster')```
- using ```cluster.fork()``` method: creates a new process.
This process will represent the exact same code from
your main process.
- using ```cluster.isMaster``` boolean flag is meant
to distinguish if the cluster is the main one or another one
-  In our practice, by decoupling request e

- NOTE:
	- you mush include and wrap the server mounting block code ( *app.listen* )
	within the else scope otherwise you'll get an error EADDRINUSE

#### Vertical and Horizontal scaling 
- Vertical Scaling ( aka scaling up ) is mainly upgrading your machine power
- Horizontal Scaling  ( aka scaling down ) is mainly decoupling processes
in smaller piece in order to be run / executed in parallel.
Generally deciding over one type of scale can makes no sense as it we
could benefit from both of them.
Remember the practical experience: the cluster was mainly decoupling the 
main processes handling requests into cloned processes for each cores
--> this is called **Round Robin** and this decoupling process is behaving as
such by default.

## PM2
Quick start - https://pm2.keymetrics.io/docs/usage/quick-start/
- Installation: https://www.npmjs.com/package/pm2
- Commands:
 - `pm2 start server.js`: launches server observing the (main?) process
 ( daemonized - able to reload while developing )
 - `pm2 stop [ server.js | id ]`: will stop the process
 - `pm2 delete server.js`: will kill the process(es) 
 - `pm2 list`: will list all your processes
 - `pm2 log`: will log in realtime
 - `pm2 start server.js -i [ n | max ]` : ( `i` for `instance`): measures the 
 amount of worker processes that will be created in our server.
 - `pm2 start server.js -i <n> -l logsFile.txt`: will start the server  
 with logs to write into the files logsFile.txt ( ==> `-l logsFile.txt` )
 - `pm2 show <pid>`: will give you a lot of details concerning the process id  
 - `pm2 monit`: ( monitoring ) will logs every details in live
 you've given

- `pm2 start server -
 ### PM2 and clustering features built-in
As it comes with the cluster module we do not need anymore
to use the cluster module within our code.
- no need to fork inside our JS: pm2 will fork the process
	- remove code block with ".isMaster" flag identification to fork - t*he code will be run as our worker process.*

### PM2 and getting details about our processes
- `pm2 show <pid>`: will give you a lot of details concerning the process id  
- `pm2 monit`: ( monitoring ) will logs every details in live

### PM2 zero downtime restart
Usually you may have a your server available for users but you want to make updates to your code.
For such cases, this is where "zero downtime restart" takes place:
It is meant for the developer to provide changes but still having your server up and running.
With pm2 we could basically use the `restart` command: but this will prevent users to have  
access on the server as this one will be stopped then restarted
`reload` is the command we want: by itself it will reload each process one by one: avoiding users
not having access to the website --> it will be transparent for the users.


### PM2: Improve performances with the Nasa Project
The bottleneck of every single threaded app will be how the servers will manage multiple requests at once.
PM2 will help in this practice of improving the Nasa Project.
1. Go within server folder: `cd server` 
2. Install locally pm2: `npm install pm2`


### How use PM2 with our Nasa Project?
Even though we have been careful while creating the APIat some point
the bottleneck will be how much CPUs is used and how many request  
the server can handle within the single threaded event loop/

In server folder:
1. `cd server` folder
2. Install locally PM2:`npm install pm2`
3. Add a script to use cluster command in `package.json`:  
`pm2 start src/server.js -i O`
 - Update `package.json` file → and add a script using
a cluster command using pm 2.  

In common* `package.json` file (* to both server ✗ client folders)
1. Add a `"deploy-cluster"` script command:
	↳ copy paste deploy script and modify `npm start --prefix server` by
	`npm run cluster --prefix server`

In the app
- Checking how the app react. '
 - ✅ - we could register a first launch
 - ✅ - we could check that launch
 - ❌ - we did register a launch action wise but couldn't see it: 2nd request not working
 - why? Checking upcoming tab → it seems the first launch was replaced by the second.
   ↳  checking `server/src/models/launcher.model.js`: we keep in
   memory the" touches Map" variable in our new process dieting as long as our process is running.
   When creating those processes we've cloned the server code,
   each code has their own "launches map" object
   ↳ we probably want to share this object
   It's because our servers are not stateless solution:
   remove the state somewhere else → Real database

   WORKER THREADS (FROM V8 ISOLATE)
 ↳ https://nodejs.org/api/worker_threads.html 
in web → https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API

Feature allowing to execute threads that execute
JavaScript in parallel. (module name: "worker_threads")
worker threads can share memory through a shared Array Buffer

What is the difference between multithreaded and a worker thread
in Node?
- worker_threads in Node are based on web worker in
available in our browser / allowing to put javascript
into a worker thread.
- thanks to **V8 isolates** (see this as sandbox instances)
	- isolated instance of the V8 engine independently.
- worker_threads is alike with cluster module but
different:
 - cluster module uses processes
 - worker_threads module uses the V8 isolates
How Hose differences should matter?

- worker can share memory with each other
