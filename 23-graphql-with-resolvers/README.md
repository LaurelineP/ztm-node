# GRAPH QL
Query language that allows to query the needed fields, 
instead of the usual REST approach which fetches the entire
data object
( Created by FaceBook in 2009)


## Resources
- course section code: https://github.com/odziem/graphql-example
- graphql: https://graphql.org/
- graphql star wars server: https://swapi-graphql.eskerda.vercel.app/ 
- graphql spec: https://spec.graphql.org/
- graphql tools: https://www.graphql-tools.com/ ( apollo tools :  can help split up the code - will be used)
- graphql with react: https://github.com/graphql/express-graphql
- Graphql execution [ scalar and function resolvers ] https://graphql.org/learn/execution/
- Graphql ID type: https://spec.graphql.org/draft/#sec-ID

### Added features with graphql
- relay: https://relay.dev/
- apollo graphql: https://www.apollographql.com/


## Graphql glossary
- query
- schemas
- resolvers:  Inner functions that resolve the response data gathered 
 as returned data for a given query

---------------------------------------------

## GraphQL and queries specs

### Syntax
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

Example: 
https://swapi-graphql.eskerda.vercel.app/
One film amongst a collection of film
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
query {
	film(<filmID>) {
		title
		releaseDate
		director
		...
	}
}
```

#### In a same query we can: 
 - query one or multiple document(s)
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
### How GraphQL differ from a RestAPI or How is this better
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
- [git]: npm init -y
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



## Access to data specific item and filter
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
	productById(id: "shoesLucky42"){
    title
    description
    price
  }
}
```