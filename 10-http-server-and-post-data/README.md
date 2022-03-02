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