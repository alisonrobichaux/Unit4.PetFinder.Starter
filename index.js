// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")))
const PORT = 1081;

// GET - / - returns homepage
app.get('/', (req, res) => {
    res.send('Homepage');
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    res.send({pets});

});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    const owner = req.query.owner;
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    if (pet) {
        res.send({ pet });
    } else {
        res.status(404).send('Pet not found');
    }

});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    if (pet) {
        res.send({ pet });
    } else {
        res.status(404).send('Pet not found');
    }

});

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); });    

module.exports = app;