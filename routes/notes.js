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
        // this grabs the unique id key from the request.params object (the /:unique_id)
        const idtoDelete = req.params.unique_id;
        // This filters through the array of objects being returned from db.json
        const outPut = jsData.filter((value) => {
        // this matches the unique id key from each object inside the db.json array to the re.params.unique_id we grabbed above
        // filter works by deleting it from the array if false and returning it if true
        // so this returns all of the object except the one we want to delete
            if (value.unique_id === idtoDelete) {
                return false;
            } else {
                return true;
            }
        })
        // write file using write file
        // this writes the output of the filter method above back to the json file
        writeToFile('./db/db.json', outPut);
        // these must be followed by a res.json() to end the call
        res.json('Note deleted')
    })


})

module.exports = notes;