const fs = require('fs');
const util = require('util');
// const path = require('path');

const readNotes = () => {
    console.log("readingNotes");
   return util.promisify(fs.readFile('db/db.json'));
};

const createNote = (note, notesArray) => {
    notesArray.push(note)

    fs.writeFile('db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    ;
};

const locateId = (id, notesArray) => {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

const editNote = (editedNote, notesArray) => {
    const index = notesArray.findIndex(note => note.id === editedNote.id);

    notesArray.splice(index, 1);
    notesArray.splice(index, 0, editedNote);

    fs.writeFile('db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)

};

const removeNote = (note, notesArray) => {
    const index = notesArray.indexOf(note);
    notesArray.splice(index, 1);

    fs.writeFile('db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    ;
};

module.exports = { readNotes, createNote, locateId, editNote, removeNote };