const express = require('express');
const api = require('./develop/route/noteRoute');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/notes.html'));
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server now listening on port http://localhost:${PORT}`);
});