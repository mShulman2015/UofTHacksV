var http = require("https");

var apiKey = '65e3afbf8707bae113c071382a40d33c';
var genre = {
    'action': 28,
    'adventure': 12,
    'animation': 16,
    'comedy': 35,
    'crime': 80,
    'documentary': 99,
    'drama': 18,
    'family': 10751,
    'fantasy': 14,
    'history': 36,
    'horror': 27,
    'music': 10402,
    'mystery': 9648,
    'romance': 10749,
    'science fiction': 878,
    'tv movie': 10770,
    'thriller': 53,
    'war': 10752,
    'western': 37
}


exports.getMovie = function(options, callback) {
    queryString = '?api_key=' + apiKey;
    if(options != null && 'genres' in options) {
        for(var i = 0; i < options['genres'].length; i++) {
            if(i ==0)
                queryString += '&with_genres=' + genre[options['genres'][0].toLowerCase()];
            else
                queryString += '%2C' + genre[options['genres'][i].toLowerCase()];
        }
    }
    if(options != null && 'genre' in options) {
        queryString += '&with_genres=' + genre[options['genre'].toLowerCase()];
    }
    if(options != null && 'year' in options) {
        queryString += '&year=' + options['year'];
    }
    if(options != null && 'decades' in options) {
        queryString += '&year=' +options['decades'];
    }
    if(options != null && 'actor_id' in options) {
        queryString += '&with_cast=' + options['actor_id'];
    }

    queryString += '&include_video=false';
    queryString += '&include_adult=false';
    queryString += '&page=1';
    queryString += '&sort_by=popularity.desc';
    queryString += '&language=en-US';

    var request_options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/discover/movie" + queryString,
        "headers": {}
    };

    console.log(request_options);

    var req = http.request(request_options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var jsonBody = JSON.parse(body.toString());
            console.log(jsonBody);
            callback(jsonBody.results[0].title);
        });
    });

    req.write("{}");
    req.end();
}

exports.getMovieByActor = function(actorName, callback) {
    console.log(actorName);
    var options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/search/person?include_adult=false&page=1&query=" + encodeURI(actorName) + "&language=en-US&api_key=65e3afbf8707bae113c071382a40d33c",
        "headers": {}
      };

      var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          var body = Buffer.concat(chunks);
          var jsonBody = JSON.parse(body.toString());

          exports.getMovie({"actor_id": jsonBody.results[0].id}, callback);
        });
      });

      req.write("{}");
      req.end();
}
