var keys = require('./keys.js');
var fs = require('fs');
var request = require('request');

var command = process.argv[2];

// remove console logs when testing complete
if(command == "my-tweets") {
	console.log("tweets go here");
	console.log(keys.twitterKeys.consumer_key);
} else if(command == "spotify-this-song") {
	var song = process.argv[3];
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