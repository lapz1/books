//Modules
const express = require('express');
const router = express.Router();

//Services
const users = require('./../../services/users');

router.route('/')
	.get((req, res) => {
		let id = req.query.id;
		res.send(users.loadUsers(id));
	})
	.post((req, res) => {			
		let username = req.body.username;
		let password = req.body.password;
		res.send(users.addUser(username, password));
	})
	.put((req, res) => {
		let id = req.query.id;
		let username = req.query.username;
		res.send(users.editUser(id,username));
	})
	.delete((req, res) => {
		let id = req.query.id;
		res.send(users.deleteUser(id));
	});

router.route('/load')
	.get((req, res) => {
		res.send(users.loadUsersFile());
	});
	
router.route('/login')
	.post((req, res) => {
		let username = req.body.username;
		let password = req.body.password;
		res.send(users.loginUser(username, password));		
	});

module.exports = router;