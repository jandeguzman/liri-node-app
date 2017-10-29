var fs = require("fs");

var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");


console.log("Choices: my-tweets , spotify-this-song , movie-this , or do-what-it-says");


var firstaction = process.argv[2];
var parametersearch = process.argv[3];


for (i = 4; i < process.argv.length; i++) {
    parametersearch += '+' + process.argv[i];
}

function commands() {

    switch (firstaction) {

        case 'my-tweets':
            getTweets();
            break;

        case 'spotify-this-song':
            getSpotify();
            break;

        case 'movie-this':
            getMovie();
            break;

        case 'do-what-it-says':
            doIt();
            break;

    }
};


function getTweets() {
    console.log("Twitter History Below");

    var client = new twitter({
        consumer_key: '92gUcw6zSaHe1Ket5zKMfXDmD',
        consumer_secret: 'LW22YyiOObM1IvR7YqMCS11A73jAW3U4xueEZDMquiI1sVt6h7',
        access_token_key: '923416214881181696-YalG6ooagze8M6VIrt1ro5A690Zumm4',
        access_token_secret: 'lBNhj8V8kTBHSL4JpqEa1fRaVlmjDIoEqF2KT4LgRky6s',
    });

    var parameters = {
        screen_name: 'JannaJannatest',
        count: 20
    };

    client.get('statuses/user_timeline', parameters, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var returnedData = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
                console.log(returnedData);
                console.log("------------");
            }
        };
    });
};




function getSpotify() {
    console.log("Awesome-sauce Songs!");

    var Spotify = new spotify({
        id: "0693b99f481d484e9d25cff71e450645",
        secret: "0f416499fb624542800ebd4cc7ed8637",
    });

    var searchTrack;
    if (parametersearch === undefined) {
        searchTrack = "The Sign Ace of Base";
    } else {
        searchTrack = parametersearch;
    }


    Spotify.search({ type: 'track', query: searchTrack }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {

            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview Here: " + data.tracks.items[0].preview_url);
        }

    });

};

function getMovie() {
    console.log("Your Movie Info Below");

    var searchMovie;
    if (parametersearch === undefined) {
        searchMovie = "Mr. Nobody";
    } else {
        searchMovie = parametersearch;
    };

    var url = 'http://www.omdbapi.com/?t=' + searchMovie + '&y=&plot=short&apikey=40e9cece';
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
        }
    });
};

function doIt() {
    console.log("Looking at random.txt now");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {


            var dataArr = data.split(',');
            firstaction = dataArr[0];
            parametersearch = dataArr[1];

            for (i = 2; i < dataArr.length; i++) {
                parametersearch = parametersearch + "+" + dataArr[i];
            };

            commands();

        };

    });

};

commands();