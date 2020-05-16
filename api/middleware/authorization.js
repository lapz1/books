//Modules
const jwt = require('jsonwebtoken');
const config = require('./../../config');

const auth = (req, res, next) => {
	let token = req.header("token");
	var decode;	
	try{
		decode = jwt.verify(token, config.tokenKey);
	}catch(ex){
		decode = false;
	}
	
	if(!!decode){
		next();
	} else {
		res
		.status(500)
		.send('Usuario no autorizado');	
	}	
}

module.exports = auth;