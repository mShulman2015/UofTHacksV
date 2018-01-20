var http = require("https");

var apiKey = '65e3afbf8707bae113c071382a40d33c';
var generes = {
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
    if(options != null && 'genere' in options && options['genere'].toLowerCase() in generes) {
        queryString += '&with_genres=' + generes[options['genere']];
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

    var req = http.request(request_options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            jsonBody = JSON.parse(body.toString());
            callback(jsonBody.results[0].title);
        });
    });

    req.write("{}");
    req.end();
}