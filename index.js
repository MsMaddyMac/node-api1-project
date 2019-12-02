// implement your API here
// imports express 
const express = require('express');

const server = express();

// creates a function to have the api return a message once it is successfully listening on the specified port 
const port = 4000;
server.listen(port, () => console.log(`API listening on port ${port}!`));

// client makes a GET request to /api/users to receive a list of users
// if error retrieving the users, cancel request and respond with status code 500
// return JSON object: {error: 'The users information could not be retrived.'}