
<<<<<<< HEAD
<details>
	<summary>📌 HTTP SERVER</summary>
[Need to update this part of the Readme?](./9-http-server/README.md)

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

</details>
<details>
	<summary>📌 PLANETS DETAILS PROJECT</summary>
[Need to update this part of the Readme?](./8-planets-details-project/README.md)

# Planets Data Details project
Project to parse data from a file to readable data and writable data using:
- fs.createReadStream: <code>fs.createReadStream(< path >)</code> based on event emitter
- csv-parser: third part library to parse CSV file through stream





</details>
<details>
	<summary>📌 NASA PROJECT DEPLOYEMENT DOCKER AND AWS</summary>
[Need to update this part of the Readme?](./22-nasa-project-deployement-docker-and-aws/README.md)

# DEPLOYMENT WITH DOCKER AND AWS
Deploy into the cloud - cloud being hosted servers accessed over the internet
- AWS from Amazon
- Azure from Microsoft
- GoogleCloud from Google
AWS top cloud tool ( 2022 )

## SERVERLESS VS CONTAINERS
- 2 approaches:
  - serverless: cloud configuring actual servers for deployment team in order to not preoccupy with those
  Just need to worry about when the code runs and what it does ( sort of event programming: where the code runs in response of some event / few cons: may encounter higher latencies, higher response times if not careful - could happen with lambda functions going to "sleep" --> then need to restart before responding to any requests / could be locked to a single cloud: example AWS and there lambda functions and can cost if h
  there is a need for migrations )
    - Lambda functions: 
    - docker: providing tools within their containers that can run anywhere

## VIRTUAL MACHINES
Related concept to containers.
( VMWare or VirtualBox or Parallels )
It allows to run another operating system alongside our existing operation system contained in isolation without any link to our machine ( except if we do a bridge to allow to access to the computer )
Note: containers and virtual machine can run together

- virtual machine: has in infrastructure ( server in cloud or personal laptop, ) a hypervisor  
( being able to pretend another operator system ) running in isolated VMs
( Amazon EC2 - handling infrastructure : multiple sandbox )


## CONTAINERS
Case: Running on different operating system containing application 
It is like a VM however it shares the OS from where it is running on while VM have to create a virtual environments on top of the infrastructure, on top of the computer + need of hypervisor + guest operating system
Whereas a container is running on the computer and making use of the host operating sys ( your OS ) + the guest OS ( OS targeted)
Docker replaces in VM : Hypervisor + Guest operating system
Containers do a lot less work | VM does a lot of work to setup )
Containers start in seconds | VM starts in minutes


Reasons to use VM:
- provides stronger isolation than containers: because of the extra layers ( Hypervisor + Guest operating system to ensure data are not leaked from customer ( between the VMs ) )

Common implementation:
Using VM with Containers ( like running Docker in EC2 Amazon services )

## INSTALL DOCKER
https://docker.com/get-started > Docker Desktop
- Download Docker for your OS with docker desktop ( recommended )
- Check if Docker is installed Using CLI
  - `docker` listing all the commands 

## RUNNING A FIRST DOCKER CONTAINER
https://docker.com/get-started > Docker Hub:  
Cloud based application registry and development team  
collaboration services meaning: Docker Hub is a docker  image repository ( Hosts images collection == snapshot of all files and applications needed for the container for the application to run  )
To  update an image we delete the image and create a new one 

--> use https://hub.docker.com [ FREE ] ( or EC2 Amazon Elastic )Container Registry
This link provides "Official images"

Practicing Docker : https://hub.docker.com/docker/getting-started
- CLI
  - `docker run docker/<docker-image>` : `docker run docker/getting-started` to create the container and run the docker image
  - `docker pull docker/getting-started`: to have the docker image locally
  - `docker run <publish-port> </port>docker/<docker-image>` : `docker run -p 80:80 docker/getting-started`
    - `-d`: run container in *detached* mode ( in the background )
    - `80:80` : on the host's port 80 matching ( : ) the container's port 80
    - `docker/getting-started`: image used
  Visiting  `http://localhost:<mapped-port>` --> will lead to the environment the hosted application
  **TIP: shorthand CLI by joining `-d` and `-p` --> `-dp 80:80`**

  ## DOCKER HUB ACCOUNT
  Docker repository
  - `docker login`: cmd to connect to your docker hub account

  ## DOCKER FILE
  Tool Plugin: Docker extension https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker helps in suggesting elements related to docker
  Creates a docker image 
  - create file :`DockerFile` to the root of your project
  - within the `DockerFile`
    - `FROM <docker-baseImage>`: selects a base-image
      - base image could be docker-image in docker hub with an environment pre-configured ( search for Node image depending of version of Node and OS desired ) --> https://hub.docker.com/_/node
        - see `node:<version>-alpine` common node image ( quite slim : 30 - 40 mg)
      - Result: `FROM node:lts-alpine` from latest node
 ![Screenshot](../assets/dockerfile-creation.pngdockerfile-creation.png)


## IMPROVING DOCKERFILE WITH LAYERS
- npm install will download packages for the docker container however it will also know your machine configuration and install those ( == will not be a container to install for all OS and not apply to alpine node version ) 
  - Objective: install on the container a fresh node_modules .
### How to ? 
- Creating a file .dockerIgnore and specify any elements that should be ignored
 - `*/node_modules`: ignoring all node_modules folder
 - `.git`: removing all git info
 - `.server/public:` removing server/public artefact
- Docker Layers
All about splitting / breaking the docker process into smaller components so they can be  
 *cached* more easily.
Docker will create a new layer each time a `COPY` or `RUN` commands   
lines are being processed if something did change
(npm install will install the server first over the client)
Add:
- copy all package related file : add an * after the word `package`


## UPDATING API URL
Once on Docker, the app will be served at the same URL;  
hence there are no need to specify the URL but the version of our API
```js
//at 22-nasa-project-deployement-docker-and-aws  /client/src/hooks/requests.js

/* Updating API URL for docker specifying to request 
 at the same location the v1 of the API */
// const API_URL = "http://localhost:8000/v1"; // PREVIOUS IMPLEMENTATION

const API_URL = "v1";

```


## BUILDING NASA PROJECT DOCKER IMAGE
resource: https://docs.docker.com/engine/reference/commandline/build/

2 Steps to use the docker configuration file:
1. build docker image:
  - `docker build [OPTIONS] PATH | URL | -`
    - ex: `docker build .`
    - with flags
     - tag ex: to tag the build + add a name to the image we are creating : `docker build . -t <account-name/project>` : `docker build . -t <user>/<docker-image-published>`
     (to run from terminal ) 
    
2. run that image to create a docker container

## RUNNING NASA PROJECT in a container
resource: https://docs.docker.com/engine/reference/commandline/run/
( second step )

- to run docker: `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`  
  - ex: `docker run -it -p 8000:8000 <user>/<docker-image-published>`
    - `-it`: let us access a terminal through our container

Having issue with the docker run not working with env file a in higher hierarchy ?
- `docker run --env-file <ENV-FILE-PATH> -it -p 8000:8000 <user>/<docker-image-published>`
and make a script out of it within package.json in order to keep that simple

  - WARNING: 
  `RUN  export $(cat ../.env) && npm run install-server --only=production` // exposes your .env file within your container

  - Alternative provided:
  https://docs.docker.com/develop/develop-images/build_enhancements/#new-docker-build-secret-information

## AWS and EC2
EC2 is an AWS service that runs instances to host a container ( docker image for example )

# Accessing the deployed version
When EC2 instance has its docker image: Go to EC2 instances: click on the instance you have and get IPV4 Public IP to which you add the port 

# CheatSheet
## Rebuild docker image ( `mac with m1 ship`): `docker buildx build . --push --platform=linux/amd64 --tag <user>/<project>:latest`
From within the repository where the dockerfile leaves

## Connect to EC2 instance
- go to EC2 dashboard with instances listed
- make sure the instance is running ( otherwise launch it )
- click on connect button ( if freshly launched instance --> click on the refresh
button in order for the connect button to be enable )
- follow the instructions and connect using the ssh **from the location where you   
registered the private / public key-pairs 


- once in the EC2 console: 
  - make sure to have updated your instance with `yum` and have `docker installed`
    - `[ sudo ] yum update -y`
    - `[ sudo ] yum install docker`
  - make sure you have the latest version of your docker image
    - `docker pull <user>/<project>:latest`
  - finally you can run the docker image within the instance
    - `docker run --restart=always -p 8000:8000 <user>/<project>`

## Check the deployed app
- Go to AWS EC2 > your instance
- copy the IPV4 ip address
- paste to the url and add the port `:8000` 
The web app should be available ✨🙌

</details>
<details>
	<summary>📌 NASA PROJECT CI CD</summary>
[Need to update this part of the Readme?](./21-nasa-project-CI-CD/README.md)

# CI / CD
**Continuous Integration**: iterate the commit to push and tests the implementation  
Part of Agile Methodology
**Continuous Delivery**: Process built on CI: have a prod ready state of your app  
(it's not a deployed version ). To implement continuous deployment, tests must be added  
to the code base. With Continuous Delivery is not the process when we would deploy necessarily.  
Ensuring ourselves the app is bug free
**Continuous Deployment**: Process built on CI: process to deploy/release the app in prod  
 deployment state is when you need to push in prod. Continuous Deployment is not specifically  
 for all companies

Resources: https://github.com/odziem/nasa-project

Tools & Services
- Circle CI: https://circleci.com/
- travis CI: https://www.travis-ci.com/
- Github actions: https://www.travis-ci.com/
- Jenkins: https://www.jenkins.io/

## PIPELINES
Pipelines are steps of validation


## GITHUB ACTIONS FOR CI/CD
### What are Github Actions ?
Services built onto github allowing to get CI Pipelines.
It is responding to multiple triggers / actions 
- on committing
- on push
Then go through a whole workflow defined in a YAML file format

### How to set up github actions                  
- `Github > Repository > Actions tab` (it could be possible for your repository  
to have recommendations based on language used)  
  - either called starter workflows and press `set up this workflow` button
  - either create a YAML file : `<file>.yml` called starter workflows and build  
  the needed CI workflow

## CONTINUOUS INTEGRATION: BUILD PIPELINES.
- In the project: create a new folder named `.github`
- In `.github/`: create a folder: create a `workflows` folder
- In `.workflows/`  create a file `node.yml`
- Then start editing it


## GITHUB ACTIONS MARKET PLACE
"Github/marketplace" we could search for a
common use case/action based on our needs with some hooks. setup node"
Those hooks are built buy dev; such as 
- checkout hook: defining the action to checkout into branches before
running `steps` for instance
Feel free to search when needed.


### Syntax
https://github.github.io/actions-cheat-sheet/actions-cheat-sheet.pdf


### Links
teacher's repo: https://github.com/odziem/nasa-project
mongodb github actions: https://github.com/marketplace/actions/mongodb-in-github-actions

</details>
<details>
	<summary>📌 NODE SECURITY AND AUTHENTIFICATION</summary>
[Need to update this part of the Readme?](./20-node-security-and-authentification/README.md)

# NODE SECURITY AND AUTHENTICATION
**Finished Code for this section*: https://github.com/odziem/security-example

## Introduction
- Security - how to secure node servers
- Authentication
- Social sign-on
- Login using OAuth ( Google )

We could create one from scratch using bcrypt,
cookie, token but in real word it is never an authentication from scratch.
They usually are done using third party services
- social media
- OAuth from google
- Amazon Cognito
- OffZero ?

Encrypting using SSL Certificate & https

## OAuth standards:
A standard secure flow for authentication and authorization
Oauth could have a flow based on cookies or token
Cookies are chain of characters exchanged between a server and a client.
	- retained and remain within the browser
	- protected by browser as no man in the middle can access your chrome
	( this is why you can see in a clear way your cookies / but someone can't )
	- cookies are not encrypted - just encoded and can easily be decoded by 
	a base 64 decoder
Token based: the token based is also a chain of characters exchanged between
a server and a client however this requires to send it through each request
Oauth is usable on HTTPS hosted web app / site - this is why we should do so

## HTTPS
To build a secured website it mush be certificated with https protocol.
To do so we could do two kinds of certificates:
- self signed certificate
- SSL

Creating a certificate: terminal, execute:
`openSSL Req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out key.pem -days 365`
• OpenSSL: OpenSSL command
• Req : Request action
• -x509 i specify the kind of desired
certificate which, here, corresponds
to self signed certificate.
• -newkey
• rsa:: best encryption ref
• 4096: bytes → max for a max protection
. -nodes: saying we will no heed password
to handle
• - keyout: creating a private key
• key.pem: file "holding the key
• -out: creating public hey
• key.pem: file holding public key.
◦ -days 365: duration of this
certificate

## Third part sign on / social sign on
Why not reusing already secured and common ways to sign up using sign ons ?
Sign ons are now proven ways to sign-up and login to an interface
Teams behind those spend time and resources to build an highly secured 
way respecting some standards - do not reinvent the wheel

## Cookie-session
( september 2022 ) --- to work with cookie-session: a downgrade of passport should be done ( --> 0.5.0 )
2 ways to sets cookie as an express middleware
- server side
	`express-cookie` for instance
	- session lives in DB
	- which get checked with all requests made
	- cons: deleted when DB/server is down
- browser side
	- session data in browser's cookies 
	( often implemented with sessions )

### Stateful and stateless cookies
- stateful cookies
	- on login: server set back a cookie using `Set-Cookie:session...`
	A reference pointer to the server
	This is a stateful cookie
	- Requiring the DB to store the session data.
	- additional request
		Could be challenging for scalability reasons

### Stateless and stateless cookies
- all sessions information needed lives in the client (browser) cookies
( stored in browser )
  - each data represent a one of cookie
  - server signing cookie || encode in order to ensure the data 
  has not be tempered  


Packages encountered
- `helmet` : package helping in setting the right headers to secure the app
- `passport` : to convey with the oauth common approach logging using a social sign-on
- `passport-google-oauth20`: to use oauth standards with google
- `cookie-session`: to enable cookie living with sessions



Node security best practices resources
https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html

</details>
<details>
	<summary>📌 NASA PROJECT WITH DATABASE X SPACEX API</summary>
[Need to update this part of the Readme?](./19-nasa-project-with-database-x-SpaceX-API/README.md)

# Nasa Project + database + external REST API

Objective: populating spaceX data into the NASA project.
SpaceX REST API: https://github.com/r-spacex/SpaceX-API

## Versioning Node API
Improving the API would lead to apply best practices to versions it.

### What is versioning an API:
Allows to gradually move all the users to the newest version and avoiding
users to break their original implementations
Ex of request expected: `https://<domain>/v1/<endpoint>`
Versioning an API application possibilities:
- Not the best practice:
	One way of doing it would be to duplicate the routers and prefixing them with`v1/`
	But does not follow the DRY principle
- Best practice: 
	Adjusting the project architecture by implementing a new router dedicated to the api version,
	without having to duplicate routers and prefixing all of them with `v1/`
	- add `server/routes/api.js` file
	- delegate all routers prefixed with `v1/`
	- export api router and consume in `server/src/app.js` as a middleware matching endpoint path: `/v1`

Once done - update tests

## Consuming Space X API
We can observer that Space X API does have a Postman API documentation set to explore.
The documentation is insightful describing all the endpoints and how it works.
This API also uses authentication for **destructive routes** ( anything changing the data ) and MongoDB and mongoose.

### Search queries
- query do not really reflect the RESTful API pattern, however it could be seen and could be considered as
acceptable exceptions within a RESTful API.
A request with a query to get data would use a different verb to get those : POST with a payload
- queries are used to request more specific
- queries' payload is within the "body" of a request

### Space X Implementation
- populating space x data: using an id reference ( a bit like foreign key to use in a POST query as mentioned previously )
will populate the very same fields on the request made
```js
	const queryBody = {
		query: {},
		options: {
			pagination: false,
			// populating definition - determined from previous observation on request
			populate: [
				{
					path:'rocket', // fields in question
					select: {
						name: 1 // nested fields in question with 1 as true
					}
				},
				{
					path:'payloads',
					select: {
						customers: 1
					}
				},
			]s
		}
	};
```
### .env files
.env files are files keeping values that are supposed to hide from the public such as
API keys, password, sensitive values.
- Using the code versioning: having such code within a project should be ignored by mentioning this file into `.gitignore`
- Accessing the variable require to install `dotenv` and import it within the file ( at the very top - as if other path
files are communicated : this would be applied to them too )
```js
process.env.<VARIABLE-NAME>
```

#### Leaked .env file: 
By mistake the env file could have been rendered public: at this point  
it is needed to assume those are corrupted and directly 
go for your credentials to be replaced.
Here it is to remove the user and add a new one with the same name and modify your
env document


</details>
<details>
	<summary>📌 NASA PROJECT WITH DATABASE</summary>
[Need to update this part of the Readme?](./18-nasa-project-with-database/README.md)

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


</details>
<details>
	<summary>📌 IMPROVING NODE PERFOMANCE</summary>
[Need to update this part of the Readme?](./17-improving-node-perfomance/README.md)

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

### RUNNING MULTIPLE PROCESSES (explanation]
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
<<<<<<< HEAD
<<<<<<< HEAD
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


### WORKER THREADS IN APPLICATION
*(In 6_worker_threads-in-application folder)*

0. import `Worker` constructor and `isMainThread` to check our thread availability in order to add a worker.
1. adds worker only if `isMainThread` ( creating new Worker with the __filename argument will keep creating one if the condition is not set )
```js
/* 0. Creates a worker thread ensure it is done once
otherwise it will keep creating new thread */
if( isMainThread ){
	new Worker(< main-script-or-module-file-path >)
}
```
2. checking what we could expect to see
	- run ```node threads.js```

</details>
<details>
	<summary>📌 NASA PROJECT</summary>
[Need to update this part of the Readme?](./16-nasa-project/README.md)

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


</details>
<details>
	<summary>📌 EXPRESS SERVER MVC ROUTER TEMPLATINGENGINE</summary>
[Need to update this part of the Readme?](./15-express-server-MVC-router-templatingEngine/README.md)

# Templating Engine:
Templating Engines are tools enabling us to dynamically inject js variable within ( using interpolation ) the HTML part based on some server state ( based on data living into the server )



</details>
<details>
	<summary>📌 EXPRESS SERVER MVC ROUTER</summary>
[Need to update this part of the Readme?](./14-express-server-MVC-router/README.md)

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
Create a middleware
	```js 
	app.use(( req, res, next ){
		//... Scope to apply code for incoming request 
		next() // 💥 must never forget this next() otherwise the server is pending
		//... Scope to apply code for returning response 
	});
	```
The ```next()``` execution tells the process to pass to the next stream.
- the code before the ```next()``` execution is to do actions on request stream
- the code after the ```next()``` execution is to do actions once the response stream as finished

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
- Replace "app" requesting on same endpoint and replace "app" by your <COMMON-ENDPOINT-NAMED-ROUTE> instance router: 
- Create a middleware for each <COMMON-ENDPOINT-NAMED-ROUTE> router ```app.use('/friends, friendsController.getFriends )```
- Grab every methods relative to an endpoint and create a file under routes/ for 	each endpoint	
	( export and import them into the server ) --> see 14-express-router
	- 2 ways: to handle every method routes url:
		- either declare to your server.js while instanciating your router the url it should match and make it relative within the route files
		- either declare the url into your routes file and make your server worrying about no first arguments ( url )


## Sending files
Express provides a ```res``` stream method ```sendFile``:
```res.sendFile(<'file-path'>)``` ( accessing any file from any path )
*To assimilate to a punctual need*
but 
```res.static(<'folder-directory'>)``` is also used to let
the server dispose from every files that public directory has.
*To assimilate to a whole robust server based - common when doing a real project to server from public directory files generated.*
See: https://stackoverflow.com/questions/31425284/express-static-vs-res-sendfile#:~:text=Static%20middleware%20and%20sendFile(),set%20ETag%20for%20you



</details>
<details>
	<summary>📌 EXPRESS SERVER MVC</summary>
[Need to update this part of the Readme?](./13-express-server-MVC/README.md)

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


</details>
<details>
	<summary>📌 EXPRESS SERVER</summary>
[Need to update this part of the Readme?](./12-express-server/README.md)

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


</details>
<details>
	<summary>📌 HTTP SERVER REQUESTS AND RESPONSES AS STREAMS</summary>
[Need to update this part of the Readme?](./11-http-server_requests-and-responses-as-streams/README.md)

# CREATE A WEB SERVER

A web server is a method from `http` or `https` modules through
the method `createServer`.
There are 2 commons ways to create a server
**Https for now will not be used**

## 6. Requests and Responses as Streams
Http server requests and responses are streams
- req: readable stream
- res: writable stream
As previously experienced ( with CSV ) data, we
can pipe 2 streams together without blocking

Server to Browser
Server to another Server


</details>
<details>
	<summary>📌 HTTP SERVER AND POST DATA</summary>
[Need to update this part of the Readme?](./10-http-server-and-post-data/README.md)

## 5 Add new data with POST
Based on `req.request`, in order to dissociate type of requests 
we should evaluate what it the returned value
( GET, POST, PUT, DELETE, HEAD, etc... methods )
- set server ready to receive POST DATA :
	- `req.on` listener to process ( on 'data' )
- any data returned from streams are buffer that need
to be processed --> through the return Buffered value 
( buffer object ) having a method `toString`
Then add it to friends array collection;

How to post data through this mere server:
By using fetch through our inspector )
and add to the options.body the friend { id, name } to add then reload your page
```javascript
// fetch(< URL >, <OPTIONS>)
fetch('http://localhost:9000/friends', {
	method: 'POST'
	body: JSON.stringify({ id: 0, name: 'Alpha' })
})
```

</details>
=======
>>>>>>> 997b2e3 ( github actions refinements)
