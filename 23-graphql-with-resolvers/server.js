
const express 			= require('express');
const path 				= require('path');
const { graphqlHTTP }	= require('express-graphql');
const { graphQLConfig } = require('./graphQLConfig');
const app 				= express();
const PORT 				= 8000



app.use('/graphql', graphqlHTTP(graphQLConfig));

app.get('/', (req, res) => {
	res.sendFile(path.resolve('./index.html'))
})

app.listen(PORT, (req, res) => {
	console.log(`GraphQL Server listing on http://localhost:${PORT}`)
})