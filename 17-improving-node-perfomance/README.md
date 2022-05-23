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
