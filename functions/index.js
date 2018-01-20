'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
// const actionMap = new Map();
const movies = require('./movies.js')
//instead of
// actionMap.set('genre', (app, result) => app.tell(`Your genre is ${app.getArgument('Genre')}, ` + result));

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  const app = new DialogflowApp({request,response});
  console.log(app.getArgument('Genre'));
  movies.getMovie({'genere': app.getArgument('Genre').toLowerCase()}, function(result) {
    console.log('my result is: ' + result);
    app.tell(`Your genre is ${app.getArgument('Genre')}, ` + result);
    // app.handleRequest(actionMap, result);
  });
  // app.handleRequest(actionMap);
});
