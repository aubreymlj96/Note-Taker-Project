const router = require('express').Router();
const notes = require('../db/db.json');
const { readNotes, createNote, locateId, editNote, removeNote } = require('../db/fsUtils');

router.get('/notes', (req, res) => {
    readNotes()
    .then((data) => {
        console.log(data);
        console.log("inside noteRoute");
        return res.json([...JSON.parse(data)]);
    }).catch((err) => {
        console.log("inside noteRoute catch");
        res.status(500).json(err)
    });
});

router.post('/notes', (req, res) => {
    console.log(req.body, notes);
    if (!req.body.id) {
        console.log('Note Received');
        createNote(req.body, notes);
    } else {
        editNote(req.body, notes);
    } 

    res.json(req.body);
});

router.delete('/notes/:id', (req, res) => {
    const note = locateId(req.body.id, notes);
    removeNote(note, notes);
    res.json();
});

module.exports = router;