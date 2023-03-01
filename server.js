const fs = require('fs');
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const apiRoutes = require('./routes/index');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clog);

app.use(express.static('public'));

// this leads to the index.html file
app.use('/api', apiRoutes);

// these two set the intitial on load of FRONT END html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// this is a catch all
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// this tells express which port to listen on
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// important note if you follow the call it goes from here to notes.html 
// WHICH loads the index.js file 
// WHICH calls the API routes

// server.js defines the api route as being in the index.js route in the routes folder
// index.js defines the notes route as being in the notes.js route in the routes folder
// this file holds the api calls that interact with the JSON file 

