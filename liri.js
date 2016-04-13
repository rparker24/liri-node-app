var keys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');

var command = process.argv[2];

var tweetKeys = keys.twitterKeys;
tweetKeys = new twitter;

if(command == "my-tweets") {
	var params = {screen_name: 'parkface13'};
	debugger;
	tweetKeys.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	    console.log(tweets[0].text, tweets[0].created_at);
	  }
	});
} else if(command == "spotify-this-song") {
	var song = process.argv[3];
	spotify.search({ type: 'track', query: song }, function(err, data) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    } 
	    var artist = data.tracks.items[0].artists[0].name;
	    var songName = data.tracks.items[0].name;
	    var album = data.tracks.items[0].album.name;
	    var previewLink = data.tracks.items[0].preview_url;
	    console.log(artist, songName, album, previewLink);
	});

	// not working - need to figure out how to handle no input for argv[3]
	if(song == "") {
		song = "What's My Age Again";
	}
	console.log(song);
} else if(command == "movie-this") {
	var movie = process.argv[3];
	console.log(movie);
} else if(command == "do-what-it-says") {
	fs.readFile('random.txt', 'utf-8', function(err, data) {

	})
	console.log("what it say");
} else {
	console.log("Command not recognized, please try again");
}