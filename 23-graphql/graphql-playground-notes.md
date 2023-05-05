# In a same query we can: 
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

# Over-fetching and under-fetching 
## How GraphQL differ from a RestAPI
## How is this better: 

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
	Requests and endpoints summary: 
	[ 
	  	/products, /product/{id}, /products/{id}/reviews,
	 	/orders, /orders/{id},
	 	/carts
	 ]
	 - for REST approach: 3 different endpoints to fetch individually --> over fetching
	 - for GraphQL approach: 1 endpoint query communicating with 3 endpoints ( cf "graphql resolving functions" )


# Over fetching and Under fetching
- Over fetching: response wise - in data received, some unnecessary data are returned
- Under fetching: not fetching enough to get all data needed, then forced to fetch another
  time to the server to get it all


==> multiple server round trips is required to get all data ( back and forth) 
==> making extra and unnecessary requests
Note: The page load time might be low in perf due to those multiple requests if it
would have been with REST

# Example - User stories:
- ability to consult product details
- ability to check the products reviews (user is not sure)
- display easily a notification or summary on top of the screen regarding the cart cost



 # Graphql resolvers: 
 GraphQL functions are the inner function that resolve the data gathered 
 as returned data for a given query



# CONS:
# complexity additions -- not worth it for small app / for larger application this does worth it
