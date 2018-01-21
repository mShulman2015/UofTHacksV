'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
// const actionMap = new Map();
const movies = require('./movies.js')
//instead of
// actionMap.set('genre', (app, result) => app.tell(`Your genre is ${app.getArgument('Genres')}, ` + result));

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  const app = new DialogflowApp({request,response});
  console.log(request.body);
  console.log(app.getArgument('Genres'));
  movies.getMovie({'genres': app.getArgument('Genres')}, function(result) {
    console.log('my result is: ' + result);
    app.tell(`Within the ${app.getArgument('Genres')} genre, you can watch , ` + result);
    // app.handleRequest(actionMap, result);
  });
  // app.handleRequest(actionMap);
});
