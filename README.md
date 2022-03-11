# Templating Engine:
Templating Engines are tools enabling us to dynamically inject js variable within ( using interpolation ) the template which is then transform
as HTML
Example:
- EJS, 
- MustacheJS,
- HandleBars
...

## INSTALL AND SET TEMPLATE ENGINE
https://expressjs.com/en/resources/template-engines.html
Install handleBar
```npm install hbs```

Set your server to use handlesbar
- server.js:
	- set engine: add beneath express server creation ```app.set('view engine', 'hbs')```
	- set where the engine will look for templates by creating a folders and refers it to server
	```app.set('views', path.join(__dirname, 'views'))```
	- Create a file underneath with extension ```hbs```
	- Add interpolations into this hbs file
	- Serve the appropriate file to the path using within a get request
	```res.render("index", <OBJECT-WITH-VARIABLE>)```


# LAYOUTS AND SEPARATION OF CONCERNS
```views/layout.hbs```
Layout is a template used for every regular templates
You refers to other file using ```{{{body}}}```


# CONCLUSION
At the end REST helps in separating concerns and helps us creating a better structure within our project
( MVC for instance ) using standard protocol ( http )