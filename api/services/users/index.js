/*[
	{
		id: auto,
		username: string,
		password: string
	}
]
*/
//Modules
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../../../config');

//Variables
let usersArray = [];

//Metodos
const addUser = (username, password) => {
	const plainPassword = password;
	const salt = bcrypt.genSaltSync(config.saltRounds);
	const hash = bcrypt.hashSync(plainPassword, salt);

	const user = {
		id: usersArray.length + 1,
		username: username,
		password: hash	
	};	
	usersArray.push(user);
	return 'El Usuario ha sido creado';
}

const editUser = (id, username) => {
	let sw = false;
	for(var i=0; i<usersArray.length; i++){
		var obj = usersArray[i];
		if(obj.id == id){
			obj.username = username;
			sw = true;
			break;
		}		
	}
	return sw ? "Usuario modificado con exito" : "Usuario no encontrado";
}

const deleteUser = (id) => {
	let sw = false;
	for(var i=0; i<usersArray.length; i++){
		var obj = usersArray[i];
		if(obj.id == id){
			usersArray.splice(i, 1);
			sw = true;
			break;
		}		
	}
	return sw ? "Usuario eliminado con exito" : "Usuario no encontrado";
}

const loadUsers = (id) => {
	if(id === undefined) {
		return usersArray;
	}
	for(var i=0; i<usersArray.length; i++){
		var obj = usersArray[i];
		if(obj.id == id){
			return obj;
		}		
	}
	return { id: 0, username: "Usuario no encontrado" };	
}

const loadUsersFile = () => {
	fs.readFile('./files/users.json','utf8', (err, data) => {
		if(err){
			console.log(err);
		}else{	
			usersArray = JSON.parse(data);
		}
	});	
	return "Usuarios cargados con exito";
}

const loginUser = (username, password) => {
	let sw = false;
	let token = '';
	for(var i=0; i<usersArray.length; i++){
		var obj = usersArray[i];
		if(username == obj.username && bcrypt.compareSync(password, obj.password)){
			token = jwt.sign({username: username}, config.tokenKey);
			sw = true;
			break;
		}	
	}	
	
	return sw ? 
		'El usuario: ' + username + ', fue asignado con el token: ' + token : 
		'El usuario: ' + username + ' no pudo iniciar sesión';
}

module.exports = { 
	addUser, 
	editUser,
	deleteUser,
	loadUsers,
	loadUsersFile,
	loginUser
};