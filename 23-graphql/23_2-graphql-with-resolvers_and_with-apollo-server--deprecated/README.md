# GRAPH QL
Query language that allows to query the needed fields, instead of 
the usual REST approach which fetches the entire data object
*(Created by FaceBook in 2009)*


## Resources
- __course section code__: https://github.com/odziem/graphql-example
- __graphql details__
	- graphql: https://graphql.org/
	- graphql star wars server: https://swapi-graphql.eskerda.vercel.app/ 
	- graphql spec: https://spec.graphql.org/
	- graphql tools: https://www.graphql-tools.com/ ( apollo tools :  can help split up the code - will be used)
	- graphql with react: https://github.com/graphql/express-graphql
	- Graphql execution [ scalar and function resolvers ] https://graphql.org/learn/execution/
	- Graphql ID type: https://spec.graphql.org/draft/#sec-ID
	- https://www.apollographql.com/docs/
	- https://github.com/apollographql/apollo-server
	- [Choosing an Apollo Server package](https://www.apollographql.com/docs/apollo-server/integrations/middleware/)
	- [Subscriptions in Apollo Server](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)
- __additional tools__
	- relay: https://relay.dev/
	- apollo graphql: https://www.apollographql.com/


## Graphql glossary
- __schemas__: defines & types the structure of a query ( including mutation queries ) 
- __query__: both the instructions to create a query and those are meant to get data
- __resolvers__:  Inner functions that resolve the response data gathered 
 as returned data for a given query
- __mutation__: graphql operation dedicated to modify data
- __subscriptions__: graphql operation dedicated to push updates  
 from the server to the subscribed client
---------------------------------------------

## GraphQL and queries specs

- __Syntax__
```graphql
{
	<field> {
		<subfield>
		<subfield>
		<subfield>
		...
	}
}
```

- __Example:__ with the example of the [swapi graphql API](https://swapi-graphql.eskerda.vercel.app/)
One film amongst a collection of films
```graphql
{
	film(<filmID>) {
		title
		releaseDate
		director
		...
	}
}
```

  or the same be prepended by `query`: 
this can be done but in general this is used for *mutations*

```graphql
# query {
query Films { # Better way to query in order to select on the server side which query ( amongst multiple to handle)
	film(<filmID>) {
		title
		releaseDate
		director
		...
	}
}
```

#### In a same query we can: 
 - query __one__ or __multiple__ document(s)
 ```graphql
{
	# Querying film document  
	film(filmID: 1){
		title
		director
	}
	# Querying person document
	person(personID: 1){
		name
		homeworld {
		name
		surfaceWater
		}
	}
}
```
 ---------------------------
### How GraphQL differs from a RestAPI or How is this better
- GraphQL simplify things by resolving 2 problematic:
	- over fetching: fetching unnecessary data / doing multiple requests
	- under fetching: query one even though this request different endpoint

- GraphQL perfect use case:
	- e commerce online: 
		- handling products
		- handling products details
		- handling products in shopping cart
		- handling orders
		- review products purchase
	Requests and endpoints summary: ```
	[ 
	  	/products, /product/{id}, /products/{id}/reviews,
	 	/orders, /orders/{id},
	 	/carts
	 ]```
	 - for REST approach: 3 different endpoints to fetch individually --> over fetching
	 - for GraphQL approach: 1 endpoint query communicating with 3 endpoints ( cf "graphql resolving functions" )


#### Over fetching and under fetching
- Over fetching: response wise - in data received, some unnecessary data are returned
- Under fetching: not fetching enough to get all data needed, then forced to fetch another
  time to the server to get it all


==> multiple server round trips is required to get all data ( back and forth) 
==> making extra and unnecessary requests
Note: The page load time might be low in perf due to those multiple requests if it
would have been with REST

##### Example - User stories:
- ability to consult product details
- ability to check the products reviews (user is not sure)
- display easily a notification or summary on top of the screen regarding the cart cost


##### CONS:
- complexity additions -- not worth it for small app / for larger application this does worth it
- bad in caching but has cumbersome ways to implement it
- not restful 

<br>



----------------------------------------------------------------

## 0. Creating a GraphQL server
- [git]: `npm init -y`
- [packages installation]
	- [express]: `npm install express`
	- [graphql]: `npm install graphql`
	- [express-graphql middleware]: `npm install express-graphql`

<br/>

### Installation warnings

- [*"express-graphql@0.12.0: This package is no longer maintained. We recommend using `graphql-http` instead."*](https://github.com/graphql/graphql-http#migrating-express-grpahql)


---- 
### Project structure init

| server.js
	- import `express` and create an `express` server
	- import `{ buildSchema }` from `graphql` and create a schema
	- connect graphql and server using `express-graphql` using `graphqlHTTP`


#### How to connect the new schema to express to be consumed ? 
Express-graphql library

#### Configure the express graph ql middleware - Syntax

```js
import { graphqlHTTP } from 'express-graphql';
import buildSchema from 'graphql'

// ... 

const configMiddleware = {
	schema :  buildSchema(`
		type Query {
			description: String
			price: Float
		}
	`),
	rootValue: {
		<data-property>: <value>
		<data-property>: <value>
	},
	/* enables graphiql: an interactive ui to manipulate query 
	which also provide a auto-generated documentation of the api */
	graphiql: true
}

/* Middleware setup to route /graphql */
app.use('/graphql', graphqlHTTP(configMiddleware));
```


#### Configure the express graph ql middleware - Applicable example

```js
const express = require('express');
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require('express-graphql');

const PORT = 8000

// Express server instance
const app = express();


// Middleware connecting graphql to express server
app.use('/graphql', graphqlHTTP({
	//`type Query {}` defines entry point of every query
	schema :  buildSchema(`
		type Query {
			description: String
			price: Float
		}
	`),
	rootValue: <data>,
	graphiql: true
}));

// sets initial / home route
app.get('/', (req, res) => {
	res.send('hey')
})

// Mounting server
app.listen(PORT, (req, res) => {
	console.log(`GraphQL Server listing on http://localhost:${PORT}`)
})
```


## 1. Creating a GraphQL server - Organizing the code
Using graphql tools will allow to organize the code in a more scalable way  
than the previous examples
- by separating the concerns of the `server.js` and all elements configuring  
graphql organized per query schema ( orders / products ) in a modular way.
- by using some tools `@graphql-tools/load-files`, `@graphql-tools/schema`

## 2. Graphql Resolvers
What are resolvers: response relies on what happen in the query
- check is query is valid by checking schemas
- then executes the query ( where each fields are determined   
by calling a function called a resolver ) 
Resolvers are meant to deal with queries having arguments to pass --> 
ending up being functions to get more specifics data

Why do we need resolvers functions? What problems do they solve?  
- Currently:
	`rootValue` property *(in `graphqlHTTP`)*: provides the data  
	coming back from the api.  
	However this `rootValue` are referring to the `models` containing  
	the data ( emulation of response from an api )

Instead of setting the `graphqlHTTP` with the `rootValue`, we use 
resolvers ( to update data using `makeExecutablesSchema` ) and adding 
a property `resolvers: {}`

Resolver help in handling asynchronous fetching
(database operations) we could requests; or
to combine some of our data (cf: `rootValue`)
Those could be also set as asynchronous functions.
```js
const schema = makeExecutableSchema({
	typeDefs,
	/** adds resolvers functions: meant to provide the logic
	 *  behind getting the data through an API 
	 * */
	resolvers: {
		Query: {
			/**
			 * 
			 * @param {*} parent - the root / rootValue
			 * @param {*} args - when queries has parameters
			 * @param {*} context - shared data across all resolvers
			 * @param {*} info - current state of the execution
			 */
			products: (parent, args, context, info) => {
				console.log('Getting products...')
				return parent.products;

			},
			orders: (parent, args, context, info) => {
				console.log('Getting orders...')
				return parent.orders;
			}
		}
	}
})
```

### Organizing and resolvers.
Instead of having resolvers lying to the main graphql configuration, some refacto could be done
by modularizing those.
Could be done with `loadFilesSync` utility
- then it is common to use function from model dealing with the data instead of relying on `rootValue` and 
the resolver's param `parent` ( === way 2 preferred over way 1)



### Access to data specific item and filter
Example access one item by their id with parametarized queries
( queries function accepting arguments )
This implies to update:
- [ type ] the `graphql`: in type query, adding an operation name ( matching the query resolver definition operation name )
- [ resolver definition ]: declare the new handler for the query of that model
- [ model functions handlers ]: to define the name of the query operation and the handler function
to export 
```graphql
# [graphql] file schema
{
	type Query {
		products: [Product]
		productById(id: String): Product
	}

}
```

Resolver and model: way 1 - parameters controlled by the resolver layer
- pros: 
	- enhance maintainability of the model handler without having to consider all
	parameters received by the middleware `makeExecutableSchema`
- cons: handling arguments to call in both files [ resolver, model ]
```js

/* [resolver]: defining a function resolver to graphql */
const products_query_resolvers = {
	Query: {
		....
		// <operation>		: <model>.<model-handler-fn>,
		productById		: (parent, args, context, info) => <model>.getProductById(args.id),
	}
}
```
```js
/* [model]: defining the model handler */
function getProductById(id){
	...
	return products.filter(product => product.id === id);
}
```


Resolver and model: way 2 - parameters controlled by model layer
- pros: 
	- if dedicated only to graphql: all the parameters could be accessed in one place
	- having to handle all parameters at one place avoids potential errors when defining
		the resolver --> no need to handle the parameters anymore as this is implicitly inherited
- cons: if the functions are used not as mere graphql resolvers,  
    the calling context must provide all arguments
```js
// [resolver file]: defining a function resolver to graphql
const products_query_resolvers = {
	Query: {
		....
		// <operation>		: <model>.<model-handler-fn>,
		productById		: <model>.getProductById,
	}
}
```
```js
/* [model file]: defining the model handler */
function getProductById(_, {id}){
	...
	return products.filter(product => product.id === id);
}
```

#### How to query resolvers and else
With the e-commerce like project we could query the following
```graphql
{
  # all orders
  orders {
    id
  }
  # resolver - one specific order
  orderById(id: 1) {
    id
    date
    total
    products {
    	quantity
		title
      	price
    }
  }
  
  # all products
  products {
    id
  }
  
  # resolver - products matching the price range
  productsByPrice(min: 1, max: 30){
    title
  }
  
  # resolver - one product
	productById(id: "product_57679776-3632-447b-861d-252be75588e0"){
    title
    description
    price
  }
}
```


## 3. Graphql Mutations
Graphql can update existing data, or create, or delete data using mutations.
Resolvers are also used in here - when handling a specific request for a specific data
### How to make mutations
While querying, instead of describing the query ( with or without the query word ), 
it should be written `mutation`.

### Tips
- resolvers - a mutation and its resolver may rely on another resolver ( keep in mind the importance of the parameters handling - [either inherited* or controlled*](#2-graphql-resolvers) )
Clean way: reuse existing resolvers if possible instead of re-implementing a similar logic
- multiple mutations queries: Querying multiple same mutations may
cause error linting. For sure one can mutate multiple times but when 
it is multiple action using the same mutation - this will cause issues.
In those case we want to apply aliases prepended by the mutation operation name. 
*( aliases here are custom name you pick )*

``` graphql
# Syntax: using aliases to differentiate multiple same mutations operation
mutation {
	<alias1>:mutationName1(<param-name>: <param-value>, <param-name>: <param-value>, ...){
		# returned properties desired
		<property1>
		<property2>
		<property3>
		...
	}
	<alias2>: mutationName1(<param-name>: <param-value>, <param-name>: <param-value>, ...){
		# returned properties desired
		<property1>
		<property2>
		<property3>
		...
	}
}
```


## GraphQL Playground in Postman
Once the server being mounted, the API is executable through postman
( must have a postman account )
This provides the collection and the queries created 
( with/out resolvers and mutations )

__Endpoints__
- for a small catalog of products
- for orders

| Topic collection | Runnable |
|:-----|:---------:|
|1 - graphql queries collection| [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/6361597-86349b61-c063-4d1e-8a33-641958471790?action=collection%2Ffork&collection-url=entityId%3D6361597-86349b61-c063-4d1e-8a33-641958471790%26entityType%3Dcollection%26workspaceId%3D5d86d608-a194-4a9c-ad9b-99019893f9d4)|
| 2 - graphql queries x resolvers collection | [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/6361597-b7a6c053-e7af-4d34-aed1-eb6f73886013?action=collection%2Ffork&collection-url=entityId%3D6361597-b7a6c053-e7af-4d34-aed1-eb6f73886013%26entityType%3Dcollection%26workspaceId%3D5d86d608-a194-4a9c-ad9b-99019893f9d4) |
| 3 - graphql mutations x resolvers collection | [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/6361597-b7a6c053-e7af-4d34-aed1-eb6f73886013?action=collection%2Ffork&collection-url=entityId%3D6361597-b7a6c053-e7af-4d34-aed1-eb6f73886013%26entityType%3Dcollection%26workspaceId%3D5d86d608-a194-4a9c-ad9b-99019893f9d4) |

## Apollo
Another graphql implementation ( similar to Facebook 
reference implementation - used so far ) 
- Apollo is more larger with more feature
	- [common] Apollo Client (React)
	- Apollo Client (IOS)
	- Apollo Client (Android)
	- [common] Apollo Server (replace for `graphql` with `express`)
	- Apollo Federation: to build single graph across multiple services
	- Apollo Studio
	- Rover CLI

Apollo comes with benefits : [caching, loading state handling, errors ] and keeps the data synced with the server

1. __Apollo Server__
Allows to create a graphql server in Node able to work with
`express`, `koa`, `hapi`, `lambda`, ...
Can implement __subscriptions__ - a third type of graphql operation 
( queries, mutations and __subscriptions__ ).
Note: This is still possible to do it through `graphql-express` but apollo server already wraps the 
behavior / features.
Those features are npm packages we can install individually 

- __Building an Apollo Server__
`apollo-server-express` [ today deprecated  now found in the `@apollo/server` package  
(https://www.npmjs.com/package/apollo-server-express) ]

1. `apollo-server-express`
This allows to combine Apollo to an existing server

	- Migration:
	Quite easy to do:
		- uninstall `express-graphql` library to replace by Apollo
		`npm uninstall `express-graphql`
		- remove all related code (`graphqlHTTP`)
		- install `apollo-server-express`
		`npm install apollo-server-express`
		- `import { ApolloServer } require('apollo-server-express');`
		- create an asynchronous function to launch the server that will
		be within the function scope definition
		- create the express app constant within the function ( same code, just need 
		to move within the function )
		- declare a new instance of ApolloServer with an object having the schema property.
		`const server = new ApolloServer({ schema: graphQLConfig.schema });`
		- replace the `app.use('/graph, graphqlHTTP(...))` by it
		- replace with `server.applyMiddleware({ app, path:'/graphql'});`
		- execute `await server.start()`
		- and **bellow**, add the middleware 
		`server.applyMiddleware({ app, path:'/graphql'});`