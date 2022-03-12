# TIPS / GOOD TO KNOWS / TRICKS 

## Check Date value
- using **strict comparison for 'Invalid Date'** returned value on non-date data
```<DATE>.toString() === 'Invalid Date'```
	- returns false when providing correct Date
	- returns true when providing wrong Date
- using **isNaN() function and .valueOf() method**
	- Note: when JS evaluates ```new Date()``` it will implicitly 
	returns the string value by default if/when correctly parsed 
	==> therefore we need to use the method ```.valueOf()``` to return the primitive value of date ( a number  )
	- isNaN( new Date().valueOf() ) returns false
	- *!isNaN( new Date().valueOf() ) returns true*
	Evaluating we get a number out of parsed new Date


# RESOURCES: