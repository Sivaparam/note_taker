const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { json } = require('express');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

//Route for notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//route for retrieving the data/notes from db.json file and display on screen
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
});

//route to add new notes entered to db.json file and display on screen
app.post('/api/notes', (req, res) => {

    var savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8', (err, data) => { }));
    req.body.id=  savedNotes.length + 1;
    savedNotes.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes, '\t'), err => {
        console.log('new note added to file');
    });
    res.send(savedNotes);
});

//route to delete the requested notes and display the remaining data 



app.listen(PORT, () =>
    console.log(`App listening on server ${PORT}`)
);