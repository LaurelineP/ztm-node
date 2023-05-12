const  { v4 : uuid } = require('uuid')

const generateUuid = (label) => {
	if(!label) throw new Error('Invalid label')
	return `${label}_${uuid()}`
}


function isValidPayload( object, properties ){
	return properties.every( prop => object.hasOwnProperty( prop ))
}

function getItem( collection, id ){ 
	return collection.find( item => item.id === id);
}



module.exports = {
	isValidPayload,
	generateUuid,
	getItem
}