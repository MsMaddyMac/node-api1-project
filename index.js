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

// client makes a POST request to add new user to /api/users 
server.post('/users', (req, res) => {
    const userData = req.body;

    // if the request body is missing the name or bio property, cancel request, respond with http status code 400 (BAD REQUEST)
    // return JSON response: { errorMessage: 'Please provide name and bio for the user.' }
    // if the info is valid, save the new user to the database
    // return status code 201 (Created)
    // return the newly created user document
    // if error while saving new user, cancel request
    // respond with status code 500 (SERVOR ERROR)
    // return JSON object { error: 'There was an error while saving the user to the database.' }
    if (!userData.name || !userData.bio) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide name and bio for the user.' })
    } else {
        db
            .insert(userData)
            .then (user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('error on POST /users', err)
            res.status(500).json({ error: 'There was an error while saving the user to the database.' })
        })
    } 
})

// client makes a DELETE request to delete a user from /api/users/:id
// user specified with id is not found, return status code 404 (Not Found)
// return JSON object { message: 'The user with the specified ID does not exist.' }
server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(users => {
        if(users) {
            res.status(200).json({ message: 'The user was removed.' });
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist.' });
        }
    })
    // error in removing the user from the database, cancel request, respond with status code 500
    // return JSON object: { error: 'The user could not be removed.' }
    .catch(err => {
        console.log('error on DELETE /users/:id', err);
        res.status(500).json({ error: 'The user could not be removed.' })
    })
})

// client makes a PUT request to update existingUser to /api/users/:id endpoint
server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const userData = req.body;

    // if the user with the specified id is not found, return status code 404
    // return JSON object: { message: 'The user with the specified ID does not exist.' }
    db.findById(id)
    .then(users => {
        if(!users) {
            res.status(404).json({ message: 'The user with the specified ID does not exist.' })
        } 
    })
    // if request body is missing name or bio property, cancel request, respond with status code 400
    // return JSON { errorMessage: 'Please provide name and bio for the user.' }
    // if user is found and new info is valid, update the user document in database with new information sent in the request body
    // return status code 200
    // return newly updated user document
    // if error when updating the user, cancel request, respond with status code 500
    // return JSON object: { error: 'The user information could not be modified.' }
    if (!userData.name || !userData.bio) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide name and bio for the user.' })
    } else {
        db
            .update(id, userData)
            .then (user => {
            res.status(200).json({user:`user ${id} was updated `});
        })
        .catch(err => {
            console.log('error on PUT /users/:id', err)
            res.status(500).json({ error: 'The user information could not be modified.' })
        })
    } 
})
// creates a function to have the api return a message once it is successfully listening on the specified port 
const port = 4000;
server.listen(port, () => console.log(`API listening on port ${port}!`));
