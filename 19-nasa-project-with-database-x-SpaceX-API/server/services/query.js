function getQuerySkip({ limitRaw, pageRaw } = { limitRaw: 0, pageRaw: 0 }){
	const page 		= Math.abs( pageRaw );
	const limit 	= Math.abs( limitRaw );
	const skip 		= ( page - 1 ) * limit;
	return {
		limit,
		skip
	}
};

module.exports = { getQuerySkip };