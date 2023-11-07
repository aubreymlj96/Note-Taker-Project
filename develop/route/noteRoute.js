const router = require('express').Router();
const notes = require('../db/db.json');
const { readNotes, createNote, locateId, editNote, removeNote } = require('../db/fsUtils');


router.get('/notes', (req, res) => {
    readNotes().then((data) => {
        console.log(data);
        return res.json(data);
    }).catch((err) => {
        res.status(500).json(err)
    });
});

router.post('/notes', (req, res) => {

    if (!req.body.id) {
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