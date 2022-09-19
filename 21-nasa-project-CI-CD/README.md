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
