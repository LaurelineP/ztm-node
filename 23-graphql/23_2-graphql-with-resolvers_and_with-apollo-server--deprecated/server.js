
const express 			= require('express');
const path 				= require('path');

/* 1. Migration to Apollo Server - remove express-graphql related code */
// const { graphqlHTTP }	= require('express-graphql');

/* 2. Migration to Apollo Server - import apollo-server-express */
const { ApolloServer }  = require('apollo-server-express');

const { graphQLConfig } = require('./graphQLConfig');
const PORT 				= 8000


/* 1.1 - Migration to Apollo Server - move old code within the function */
// app.use('/graphql', graphqlHTTP(graphQLConfig)); 

/* 2.1 - Migration to Apollo Server - use middleware ApolloServer */
/* 2.1.1 - Make a function to launch server */
/* 2.1.2 - Create the apollo server  */
/* 2.1.3 - Set middleware with the function launching the server */

/* 2.1.1 Goal: to make executable schema to define our server's response to graphql requests */
async function startApolloServer(){
	const app = express();
	// `schema` should be consumable/defined from within the function
	// 1. removes /graphql endpoint middleware with `app.use()`


	// 2.1.2 instantiate ApolloServer to create server
	const server = new ApolloServer({ schema: graphQLConfig.schema });

	// 2.1.3 - start server before the middleware 
	await server.start();

	/** 2.1.2 - applyMiddleWare: calling `app.use` on 
	 * ApolloServer's middleware into mount the server */
	server.applyMiddleware({ app, path:'/graphql'});
	

	/* -------------------- Route and server initializations -------------------- */

	app.get('/', (req, res) => {
		res.sendFile(path.resolve('./index.html'))
	})
	
	app.listen(PORT, (req, res) => {
		console.log(`GraphQL Server listing on http://localhost:${PORT}`)
	})
};

startApolloServer();