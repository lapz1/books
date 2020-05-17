//Modules
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('./../../config');

function crearLog(username, method, path){
	let linea = Date.now() + ", " + username + ", " + method + " " + path + "\r\n";
	fs.appendFile('./files/audits.log', linea, (err) => {
		if(err){
			console.log(err);
		}
	});
}

const auth = (req, res, next) => {
	let username = req.header("username");
	let token = req.header("token");
	var decode;	
	try{
		decode = jwt.verify(token, config.tokenKey);
	}catch(ex){
		decode = false;
	}
	
	if(!!decode){
		crearLog(username, req.method, req.path);
		next();
	} else {
		res
		.status(500)
		.send('Usuario no autorizado');	
	}	
}

module.exports = auth;