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
