var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
    res.send("welcome to the beginning");
});

app.get('*', function(req, res) {
    res.status(404).send("hi, sorry didn't find what you where looking for");
}); //404 error

app.listen(process.env.PORT || 8080);
console.log('Listening on port ' + (process.env.PORT || 8080));