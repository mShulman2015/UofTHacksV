'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const movies = require('./movies.js')
var param = ""
var previous_input = {}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  const app = new DialogflowApp({request,response});

  var inputOption = {}
  if(app.getArgument('Genre'))
    inputOption["genre"] = app.getArgument('Genre');
  if(app.getArgument('Genres'))
    inputOption["genres"] = app.getArgument('Genres');
  if(app.getArgument('Year'))
    inputOption["year"] = app.getArgument('Year');
  if(app.getArgument('Description')){
      movies.getMovieDescription(param,function(result) {
      app.ask(result.title);
    });
  }
  if(app.getArgument('Again')){
    if(param != ""){
      return movies.getMovieByActor(param, function(result) {
        console.log('my result is: ' + result.title);
        app.ask(`Have you watched ` + result.title + ' ?');
      });
    }
    else if (previous_input != {}){
      movies.getMovie(inputOption,function(result) {
        console.log('my result is: ' + result.title);
        app.ask(`have you watched ` + result.title + ' ?');
        previous_input = inputOption;
      });
    }
  }


  if(app.getArgument('Actor')) {
    return movies.getMovieByActor(app.getArgument('Actor'), function(result) {
      console.log('my result is: ' + result.title);
      app.ask(`How about ` + result.title + ' ?');
      param = app.getArgument('Actor');
    });
  }

  movies.getMovie(inputOption,function(result) {
    console.log('my result is: ' + result.title);
    app.ask(`How about ` + result.title + ' ?');
    previous_input = inputOption;
  });
});
