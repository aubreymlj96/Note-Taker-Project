const { randomUUID } = require('crypto');
const fs = require('fs');
const util = require('util');
// const path = require('path');
const readFilePromise = util.promisify(fs.readFile);

const readNotes = async() => {
    return readFilePromise('db/db.json', 'utf-8');
};

const createNote = (note, notesArray) => {
    const newNote = {title: note.title, text: note.text, id: randomUUID()};
    notesArray.push(newNote);
    console.log(notesArray);

    return util.promisify(fs.writeFile('db/db.json', JSON.stringify(notesArray, null, 4), (err) => err ? console.error(err): console.info('database updated')));
};

const locateId = (id, notesArray) => {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

const editNote = (editedNote, notesArray) => {
    const index = notesArray.findIndex(note => note.id === editedNote.id);

    notesArray.splice(index, 1);
    notesArray.splice(index, 0, editedNote);
    
    return util.promisify(fs.writeFile('db/db.json', JSON.stringify(notesArray, null, 4), (err) => err ? console.error(err): console.info('database updated')));
};

const removeNote = (note, notesArray) => {
    const index = notesArray.indexOf(note);
    notesArray.splice(index, 1);

    return util.promisify(fs.writeFile('db/db.json', JSON.stringify(notesArray, null, 4), (err) => err ? console.error(err): console.info('database updated')));
};

module.exports = { readNotes, createNote, locateId, editNote, removeNote };