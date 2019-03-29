var fs = require('fs');
var chalk = require('chalk');

var addNote = (title, body) => {
	//load the notes
	var notes = loadNotes();
	//check for dublicate titles
	var duplicateNote = notes.find((note) => note.title === title);

	if (!duplicateNote) {
		//change notes
		notes.push({
			title: title,
			body: body
		});
		//save notes
		saveNotes(notes);
		console.log(chalk.green.inverse('New note added'));
	}
	else {
		console.log(chalk.red.inverse('Note title taken'));
	}
};

var removeNote = (title) => {
	var notes =loadNotes();
	var searchingTitle = notes.filter((note) => note.title !== title);
	if (notes.length <= searchingTitle.length){
		console.log(chalk.green.inverse('No note found'));
	}
	else {
		console.log(chalk.red.inverse('Note removed'));
	}
	saveNotes(searchingTitle);
};

var listNotes = () => {
	var notes = loadNotes();
	console.log(chalk.magenta.inverse('Your notes:'));
	notes.forEach(element => {
		console.log(element.title);
	});
};

var readNotes = (title) => {
	var notes = loadNotes();
	var searchTitle = notes.find((note) => note.title === title);
	if (!searchTitle){
		console.log(chalk.red.inverse('No note found'));
	}
	else {
		console.log(chalk.yellow.italic(title) + '\n' + searchTitle.body);
	}
};

var saveNotes = (notes) => {
	var dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

var loadNotes = () => {
	//error catcher
	try {
		//numbers from the json file
		var dataBuffer = fs.readFileSync('notes.json');
		//JSON string
		var dataJSON = dataBuffer.toString();
		//shows as an object
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

//export functions
module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNotes: readNotes
};