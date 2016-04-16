var keys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var moment = require('moment');

var command = process.argv[2];
var time = moment(new Date());

var tweetKeys = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});

function tweeter() {
	var params = {screen_name: 'parkface13'};
	tweetKeys.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
		    for(var i = 0; i < tweets.length; i++) {
		    	console.log(tweets[i].text, tweets[i].created_at);
		    }
		}
	});
};

function spotifyThis(song) {
	if(song == undefined) {
		song = "What's My Age Again";
	}
	spotify.search({ type: 'track', query: song }, function(err, data) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    var artist = data.tracks.items[0].artists[0].name;
	    var songName = data.tracks.items[0].name;
	    var album = data.tracks.items[0].album.name;
	    var previewLink = data.tracks.items[0].preview_url;
	    console.log(artist);
	    console.log(songName);
	    console.log(album);
	    console.log(previewLink);
	});
};

function movieThis(movie) {
	if(movie == undefined) {
		movie = "Mr Nobody";
	}
	movie = movie.replace(' ', '+');
	queryURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true&r=json';
	request(queryURL, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			console.log(data.Title);
			console.log(data.Year);
			console.log(data.imdbRating);
			console.log(data.Country);
			console.log(data.Language);
			console.log(data.Plot);
			console.log(data.Actors);
			console.log(data.tomatoMeter);
			console.log(data.tomatoURL);
		}
	});
};

if(command == "my-tweets") {
	tweeter();
} else if(command == "spotify-this-song") {
	spotifyThis(process.argv[3]);
} else if(command == "movie-this") {
	movieThis(process.argv[3]);
} else if(command == "do-what-it-says") {
	fs.readFile('random.txt', 'utf-8', function(err, data) {
		if(err) throw err;
		var strings = data.split(',');
		if(strings[0] == "spotify-this-song") {
			spotifyThis(strings[1]);
		} else if(strings[0] == "movie-this") {
			movieThis(strings[1]);
		} else if(strings[0] == "my-tweets") {
			tweeter();
		} else {
			console.log("Input not recognized");
		}
	})
} else {
	console.log("Command not recognized, please try again");
}

var logData = [(process.argv[2]), (process.argv[3]), time._i];

fs.appendFile('log.txt', logData, 'utf-8', (err) => {
	if(err) throw err;
})