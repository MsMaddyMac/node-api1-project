// implement your API here
// imports express 
const express = require('express');
// import the database file in order to use methods associated within it for CRUD
const db = require('./data/db.js');

const server = express();

server.use(express.json()); // needed to parse JSON from the body

// client makes a GET request to /api/users to receive a list of users
server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    // if error retrieving the users, cancel request and respond with status code 500
    // return JSON object: {error: 'The users information could not be retrived.'}
    .catch(err => {
        console.log('error on GET /users', err);
        res
        .status(500)
        .json({ errorMessage: 'The users information could not be retrived.' })
    })
})

// client makes a GET request to get user by id /api/users/:id
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    // if the user with specified ID is not found, return status code (404) (NOT FOUND)
    // return JSON object: { message: 'The user with the specified ID does not exist.' }
    db.findById(id)
    .then(users => {
        if(users) {
           res.status(200).json(users) 
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist.' })
        }
    })
    // if error retrieving the user from the database, cancel request, respond with status code 500.
    // return JSON object: { error: 'The user information could not be retrieved.' }
    .catch(err => {
        console.log('error on GET by ID /users/:id', err);
        res.status(500).json({ error: 'The user information could not be retrieved.' })
    })
})





// creates a function to have the api return a message once it is successfully listening on the specified port 
const port = 4000;
server.listen(port, () => console.log(`API listening on port ${port}!`));
