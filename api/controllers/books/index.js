const express = require('express');
const router = express.Router();
const dateUtilities = require('./../../utilities/date');

const books = require('./../../services/books');
const auth = require('./../../middleware/authorization');

router.route('/')
	.get((req, res) => {
		res.send(books.loadBooks());
	})
	.post(auth, (req, res) => {
		let name = req.body.name;
		let author = req.body.author;
		let date = req.body.date;		
		res.send(books.addBook(name, author, date));
	})
	.put(auth, (req, res) => {
		let id = req.query.id;
		let name = req.query.name;
		let author = req.query.author;
		let date = req.query.date;
		res.send(books.editBook(id,name, author, date));
	})
	.delete(auth, (req, res) => {
		let id = req.query.id;
		res.send(books.deleteBook(id));
	});

router.route('/:id')
	.get((req, res) => {
		let id = req.params.id;
		res.send(books.loadBookId(id));
	});

module.exports = router;