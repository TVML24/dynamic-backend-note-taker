const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            unique_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding Note');
    }
});

notes.delete('/:unique_id', (req, res) => {
    // parse json from db using readfrom file
    readFromFile('./db/db.json').then((data) => {
        const jsData = JSON.parse(data);
        // identify object you want to delete using the key (unique_id)
        // delete from an array (using filter)
        const idtoDelete = req.params.unique_id;
        const outPut = jsData.filter((value) => {
            if (value.unique_id === idtoDelete) {
                return false;
            } else {
                return true;
            }
        })
        // write file using write file
        writeToFile('./db/db.json', outPut);
        res.json('Note deleted')
    })


})

module.exports = notes;