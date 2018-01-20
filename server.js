'use strict';
var express = require('express');
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const genre = new Map();
var app = express();
var bodyParser = require('body-parser');

// app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
    res.status(200).send("welcome to the server, things are working well");
});

genre.set('genre', movieAdvisor => movieAdvisor.tell(`Your number is ${movieAdvisor.getArgument('Genre')}`));

app.post('/', function(req, res) {
  console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
  const movieAdvisor = new DialogflowApp({Request: req, Response: res});
  movieAdvisor.handleRequest(genre);
});

app.get('*', function(req, res) {
    res.status(404).send("hi, sorry didn't find what you where looking for");
}); //404 error

app.listen(process.env.PORT || 8080);
console.log('Listening on port ' + (process.env.PORT || 8080));
