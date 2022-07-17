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
	 it has protocol: http
	 it has hostname: localhost
	 it has a port: 9000

Cross origin requests: requests sent from an origin to another  
By default browser block cross origin requests 


## Database
### What is a database?
- A collection of data
- A tool to use to access those data and persist those.
NB: when creating array to store data → it is not  
persisted → temporary available white server is  
running.

### Recommended path: take SQL appendix

### COMPARING SQL VS NOSQL
We are looking at PostGreSQL as SQL database
and MongoDB as NoSQL database.  
(Note:
- regarding PostGre → all elements talked, regarding  
PostGre will mainly be relevant for other SQL  
databases.
- regarding MongoDB → NoSQL databases tied to be
specified for each NoSQL database ).
____

- NoSQL: data generally structured ui JSON format
- SQL : data structured in Table  
These days, each ( models ) is learning from the other  
model in order to evolve their database model concept.

### DATABASE SCHEMAS 2 SCHEMA LESS DATABASES
Common misunderstood about → schemas.
Schemas structures our data in databases.  
Example: a `User` schema
↳ could be defined to be able to always store:
[ first-Name, Last Name, date of birth, phone,
location, etc... ]
These give the advantage to have the data
structured and predictable  
SQL model rely on rigid schema that should
be planned ahead of time → Which is harder  
to adjust through time I restructured)
sometimes shutting down the database is  
required. /for instance to change the type of
data) , not ideal if you want to have  
your data available 241-1 a day, 7
days a week.  
NoSQL databases are more flexible (also sometimes
called "**schema-less**" even though it is not
entirely true.  
It will be easier to add schema in the code.  
Taking advantage of the performance and
flexibility by enforcing schema on requests  
- adding more safety

## CHOOSING A DATABASE FOR THE NASA PROJECT
*(Repository sub Folder: 18-nasa-project-with-database.)*
Requirements:
1. Need to persist data between restart.
2. API needs to be stateless for cluster
mode (launches were stored within an array)
- in `project folder > server > routes > Launches > Launches.controller.js`
The only state our data should rely on is the" request
object passed in our server - *here through express*

## IDENTIFYING OUR CURRENT NEEDS.
→ store launches with different properties
(being differently typed).  
→ store list of habitable planets  
(Note we can observe the relation between the 2  
objects --> `target` property is in both objects )  
→ the latest flight number that should increase
→ `id` of the flight

IDENTIFYING HOW THE DATA WOULD BE ACCESSED
→ currently through a' JavaScript map related
to a flight number.  
→ Planets requested in sequence.  
→ Latest flight number is used to create new
launches.  

### SQL VS MONGODB: TRENDS AND OBJECT-RELATIONAL IMPEDANCE MISMATCH
- JSON ✗ BSON in MongoDB: https://www.mongodb.com/json-and-bson
- writing scripts for Mongo shell : https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/
• Post GRE JSON Types: https://www.postgresql.org/docs/current/datatype-json.html
• object-Relational Impedance Mismatch: https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch

Observing our code:
- written in JSON and JavaScript
  -  no need for transformation → MongoDB alike
- PostGre can store data using JSON
  - will need to add a layer as SQL is with Table  
 not aligned w/ the way we store in Javascript.  
  - still possible but would need extra layer work
to map the data to match isolated Table for PostGre
  - A code not matching the relational model and
in need to adjust is called: object-relational
impedance mismatch.

### SQL V5 MONGODB : SCHEMAS REFERENCES AND ACID TRANSACTIONS
ACID Transaction: Atomicity, Consistency, Isolation Durability  
https://www.ibm.com/docs/en/cics-ts/5.4?topic=processing-acid-properties-transactions
Taking a closer look at the data we will need to store
Our data are pretty basics
Regarding planets → we don't gain much
to Remove duplication when matching
our launch to a planet name.
If we had complicated object with the
need of matching it would have be
best to use SQL
Mongo has some tools for relational data
but not as good as SQL
Pros for SQL in general:
- transactions CRUD or more complex
↳ ACID transactions
(Atomicity, Consistency, Isolation, Density)
- ensures transactions of data as a
whole; not accepting partial data
transaction
- Schemas L Constraints
(MongoDB can be ACID but most likely to
transfer data partially.)
EX: abort-Launch has 2 needs → may
become a partial transfer.

## SETTING UP MONGODB ATLAS
. Mongo official website: https://www.mongodb.com/
. Principle of Least Privilege: https://www.cyberark.com/what-is/least-privilege/


- Pick MongoDB as Community version → locally
- Pick MongoDB as Cloud → more general.

1. CREATE MONGODB DATABASE
- create a cluster / build cluster button (video) / build database button (current site)
- select "shared" free liters
	- it redirects to "create shared cluster"
	- a recommendation has been preselected → follow recommendations.
	- will be redirected to security quick start → ignore

2. CREATE A USER
- on side menu) security section> Database Access
	- "Add new database user")" authentication method" > define password  
	(auto generate secure password recommended) and  user-name
	- associate privileges following the principle of the least privilege
	- validate / confirm your user creation.

3. SEAL RISE NETWORK ACCESS
Secure your database by white listing IP
-  on side menu > "Network access" in network access panel: "Add IP Address"
	1. REMOTELY SERVED
	When starting using database in production we
	can select specifically the IP addresses for the
	server hosting our node project; that will be
	the only server, the only IP address that will
	need to access the database:
	because all accesses will be going through
	the API.
	To do so, fill the following inputs:
	" Access List Entry", (optional)" Comment"
	2. LOCALLY SERVED
	If the server is served locally we could add
	OUR current IP by Selecting : "Add current IP address" button
	3. SERVED IN DEVELOPMENT
	In development several IPs may be used
	which would result in selecting: "Allow access from anywhere" button

4. CONNECT TO MONGO All STER
- On side menu> "cluster" (old version of MongoDB site)
- On side menu > "Database" (current version of MongoDB)
	- Click on" connect"
- 3 ways to connect
	- through Mongo shell
	- through the application
	- through MongoDB Compass


### CONNECTING TO MONGODB
mongoose official website
connecting to MongoDB using Mongoose.
Mongoose has extra features
- advance querying feature
- features to create models from our data following
schemas
practice connect to database and persist our data.
1. prepare DB URL
protocol protect cluster → can be changed & will create
a new database
2. install mongoose: "npm install mongoose"
3. use mongoose to connect:
- import mongoose: 'const mongoose = require ( 'mongoose')'
- Connect to DB URL: Note; mongoose takes 2 args: [ MONGO URL , OPTIONS],
	-  options have 4 recommended properties:
		- use New Url Parser: true → determines how the connection string is parsed
		- use Find And Modify: false > disables the outdated way to update data
		- use create Index: true > ensure to use create Index function instead of using the ensure one
		- use Unified Topology.-true > ensure mongoose will use the updated way to talk to cluster of Mongo Databases.
There are MongoDB driver options used by mongoose to connect to databases.
MongoDB driver is the official API that Node uses to talk to databases.
4. Check the connection establishment "mongoose.connection"
- is an event emitter triggering when the connection
- is Ready, has errors, etc...
	- `mongoose.connection.on( 'open', () => {})`
	- `mongoose.connection.once( 'open', () => {})` =>  triggers once
(set outside of the current function definition start Server)

### CREATE A SCHEMA ( FOR NASA PROJECT )
- `mongoose.Schema({})`

### CREATE A MODEL
- `mongoose.Model(<SINGULAR-SCHEMA-NAME-STRING>, SCHEMA )`
The model is created using the Schema definition
IMPORTANT: Mongoose will automatically create a plural named version of the provided Schema
Which should definitely be taken into account while coding those lines

### CREATE OR UPDATE DOCUMENTS 
- `<MODEL-VARIABLE>.updateOne({ ..., upsert : true }`: avoids to have failures while creating
or updating to the dataBase
`upsert` implementation:
- Allows to create or update the database's document while creating a Document.
Upsert is an option to provide the `<Model>.updateOne` method ( in this example )
as an option.

### SAVING PLANETS ( USING UPSERT )
- using `<MODEL>.updateOne({}, {}, { upsert: true })` into `savePlanets function definition`
- checking MongoDB Atlas interface to find `planets` collection

### UPDATING PROJECT ARCHITECTURE
The project architecture diagram needs to be updated as it did change. by
These changes are the followings:
- adding a database MongoDB
- adding the database clusters 
- adding the connection between the API and the
database

### OBJECTID
Once the document has been created, the planet can be observed to be with 2 new fields:
- `_id`: called _ObjectId_ is a unique id created for each document by MongoDB.
Those unique ObjectId might look like random caracters but this is not.
The ObjectId relay on Timestamp - integer relative to a Date object
https://steveridout.com/mongo-object-time/
- `__v`: called _version key_ - is the version for the schema used, created by Mongoose
It means that different schema version can work together within a same database - which 
would not be as flexible using a sequel database


### EXCLUDING FIELDS FORM THE MONGODB DATABASE
Using `<Model>.find` method and proving the corresponding arguments, it is possible to excludes
unnecessary fields 
```js
{ _id: 0, __v: 0 },		// shown in course: object: with fields as properties having 0 as value --> fields
'-_id', '-__v',			// string alternative: note the minus before the string --> fields exclusion
[ '-_id', '-__v' ],		// Array[ string ] alternative : note the minus before the string --> fields exclusion
```

### SAVING LAUNCHES
```<MODEL>.updateOne(,,{ upsert: true })``` creates a new document

### LISTING LAUNCHES
```<MODEL>.find({})``` Gets all the documents

### REFERENTIAL INTEGRITY
- Wikipedia: https://en.wikipedia.org/wiki/Referential_integrity
- Node Best practices: https://github.com/goldbergyoni/nodebestpractices

Progressing to the database migration, the project needs to be stateless
and get rid of the dependencies of the 
- the launches dependency ( not entirely migrated )
- auto-increment feature with NodeJS ( relating to launches as each flight
should have an auto incremented `flightNumber` )

#### SQL Languages
Have the auto-increment feature natively
- MySQL: with `AUTO-INCREMENT`
- PostGre: with `SERIAL`

#### MongoDB - Document based databases
Have no such built-in feature mainly because of the Node ability to have multiple cluster
Leading to --> which database in which cluster should handle the auto-incrementation and synced
with all the others in clusters ? 
- no built in solutions to that
- however a side step implementing the same
	- get the last value for one document `.findOne() // from mongoose `
	- get the queries data sorted with the criteria relating to the last launch saved `.sort([< operator >]< criteria >])`
		*operator here is optional and define in which order*

### SCHEDULING NEW LAUNCHES
Involves to migrate the initial logic using a local storing object to a logic using external storage
such as the database.
The concerned logic is the creation of a launch involving
- auto increment each new flight by one using mongodb and mongoose
- store it to the database

#### Auto incrementation and save launch
- Get last flight number: find a way to get the latest flight number stored in database otherwise assign one by default
	- all functions involved in the creation of a new launch and using `launches` storage variable should
	by **asynchronous** as it should involves the launches from the launches document from database
	- Find the last stored data trick with `.findOne(<all>)` + criteria researched + `.sort(<string-criteria-with-or-without-operand>)` in a descending way --> which will get the one launch based on the criteria to sort in a descending way
		- pattern: ```<MODELDB>.findOne(<all>, <projection-criteria-returned-value>).sort([<operand>]string-criteria></string-criteria>)```;
		- example: ```LaunchesModelDB.findOne({}, 'flightNumber -_id -__v' }).sort('-flightNumber')```
- Save to database:
	Receiving the the launch as parameter, we will increment the flight number on saving using the "getLastFlightNumber" created function
	- `findOneAndUpdate( , , { upsert: true })`: does save or update but it returns `$setOnInsert` as the launch
	was mutated during the process and database response returns this value amongst the fields
	- `updateOne()` does save or update but database returns only the updated object
	not fields inner used field to DB ( unique document id, version of the schema, neither `$setOnInsert` )

### ABORTING LAUNCH
Aborting a launch using DELETE method allow to just pass the id and handle the logic.
However the feature in the nasa project is not about deleting it but actually updating the launch status
in order to keep an history of those.
- No `deleteOne()` method on `LaunchesModelDB`
- Apply `updateOne()` method on `LaunchesModelDB`
- Ensure the launch exist --> see `getExistingLaunchById` ( id being the flight number )

### UPDATING TESTS TO USE DATABASE
TO BE AWARE: doing test using database do mutate the database. If multiple tests should be run: it would
be best to have a dedicated database for it.

- **refacto database implementation**: from server to make the database logic reusable in order to import that into our tests
- **consume database into our tests**: before all tests the database should be connected in order to test
launches and planets - using setup such as Jest `beforeAll`.
```js
beforeAll( async () => {
	await connectToMongo();
})
```
- **ensure to close database connection**: after all tests the database should be disconnected.
Using Jest teardown being `afterAll` will ensure to process any logic define after running the test.
Ideal to disconnect the database/
```js
afterAll( async () => {
	await disconnectFromMongo()
})
```
- if jsDOM complaints: ensure your `package.json` or `jest.config.js` are set for `jest.testEnvironment = "node"` ( in curly braces syntax )
```
