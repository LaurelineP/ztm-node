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