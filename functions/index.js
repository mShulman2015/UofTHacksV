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
     app.ask(movies.overview);
  }
  if(app.getArgument('Again')){
    if(param != ""){
      return movies.getMovieByActor(param, function(result) {
        console.log('my actor result is: ' + result);
        app.ask(`Have you watched ` + result + ' ?');
      });
    }
    else if (previous_input != {}){
      movies.getMovie(previous_input,function(result) {
        console.log('my result is: ' + result);
        console.log('previous input is: ' + previous_input);
        app.ask(`have you watched ` + result + ' ?');
      });
    }
  }
  if(app.getArgument('Genre') || app.getArgument('Year')){
    movies.getMovie(inputOption,function(result) {
      console.log("triggered");
      app.ask(`How about ` + result + ' ?');
      previous_input = inputOption;
    });
  }


  if(app.getArgument('Actor')) {
    return movies.getMovieByActor(app.getArgument('Actor'), function(result) {
      console.log('my result is: ' + result);
      app.ask(`How about ` + result + ' ?');
      param = app.getArgument('Actor');
    });
  }
});
