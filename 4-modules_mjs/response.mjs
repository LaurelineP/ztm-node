function decrypt( data ){
	return `decrypt ${ data }`
}

function read(){
	return decrypt( 'DATA' )
}

export { read }