/*
[
	{
		id: auto,
		name: string,
		author: number,
		date: string
	}
]
*/
const booksArray = [];

const addBook = (name, author, date) => {
	const book = {
		id: booksArray.length + 1,
		name: name,
		author: author,
		date: date
	};		
	booksArray.push(book);
	return "El libro ha sido creado";
}

const editBook = (id, name, author, date) => {
	let sw = false;
	for(var i=0; i<booksArray.length; i++){
		var obj = booksArray[i];
		if(obj.id == id){
			obj.name = name;
			obj.author = author;
			obj.date = date;
			sw = true;
			break;
		}		
	}
	return sw ? "Libro modificado con exito" : "Libro no encontrado";
}

const deleteBook = (id) => {
	let sw = false;
	for(var i=0; i<booksArray.length; i++){
		var obj = booksArray[i];
		if(obj.id == id){
			booksArray.splice(i, 1);
			sw = true;
			break;
		}		
	}
	return sw ? "Libro eliminado con exito" : "Libro no encontrado";
}

const loadBookId = (id) => {	
	for(var i=0; i<booksArray.length; i++){
		var obj = booksArray[i];
		if(obj.id == id){
			return obj;
		}		
	}
	return { id: 0, name: "Libro no encontrado" };
}

const loadBooks = () => {
	return booksArray;
}

module.exports = { 
	addBook, 
	editBook,
	deleteBook,
	loadBooks,
	loadBookId
};