'use strict';
var express = require('express');
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const genre = new Map();
var app = express();

// app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
    res.status(200).send("welcome to the server, things are working well");
});

app.post('/', function(req, res) {
  genre.set('lucky.number', movieAdvisor => movieAdvisor.tell(`Your lucky number is ${movieAdvisor.getArgument('color')}`));
  console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
  const movieAdvisor = new DialogflowApp({req,res});
  genre.handleRequest(genre);
});

app.get('*', function(req, res) {
    res.status(404).send("hi, sorry didn't find what you where looking for");
}); //404 error

app.listen(process.env.PORT || 8080);
console.log('Listening on port ' + (process.env.PORT || 8080));
