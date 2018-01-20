'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const actionMap = new Map();
//instead of
actionMap.set('genre', app => app.tell(`Your genre is ${app.getArgument('Genre')}`));

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  const app = new DialogflowApp({request,response});
  console.log(app.getArgument('Genre'));
  /*getMovie({'genere': app.getArgument('Genre')}, function(result) {
    // console.log(result);
    app.handleRequest(actionMap);
  });*/
  app.handleRequest(actionMap);
});
