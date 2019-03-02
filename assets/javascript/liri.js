require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var search = process.argv.slice(3).join("+");
const fs = require('fs');

// add moment.js //
// var moment = require('moment');



switch (input) {
  case 'concert-this':
    concertThis(search);
    break;

  case 'movie-this':
    movieThis(search);
    break;

  case 'spotify-this-song':
    spotifyThisSong(search);
    break;

  case 'do-what-it-says':
    doWhatItSays(search);
    break;

  default:
    console.log("Please use a valid command.")
    return;
};

// Axios Call - OMDb Include the axios npm package (Don't forget to run "npm install axios" in this folder first!) //

function movieThis(search) {
  var axios = require("axios");
  var movie = search;

  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function (response) {

      // console.log(response);

      if (!movie) {
        movie = "Mr.+Nobody"
      };

      console.log("=========================")
      console.log("Movie Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("==========================");

    }
  );
}

function concertThis(search) {
  var axios = require("axios");
  var artist = search;

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(
    function (result) {

      console.log("=========================")
      console.log("Venue: " + result.data.venue.name);
      console.log("Location: " + result.data.venue.city + "," + result.data.venue.region + "," + result.data.venue.country);
      console.log("Event Date: " + result.data.datetime); // moment .js use here //
      console.log("==========================");
    }
  );
}

function spotifyThisSong(search) {
  var song = search;
  if (!song) {
    song = "The+Sign";
    console.log(song);
  }

  spotify.search({ type: "track", query: song }, function (err, data) {

    if (err) {
      console.log("Error occurred: " + err);
    }

    data = data.tracks.items[0];

    console.log("Artist(s): " + JSON.stringify(data.artists[0].name));
    console.log("Song Name: " + JSON.stringify(data.name));
    console.log("Preview Link: " + JSON.stringify(data.external_urls));
    console.log("Album: " + JSON.stringify(data.album.name));

  });

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
        return console.log(error);
      }
      console.log(data);

      fs.appendFile("random.txt", data, function(err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(data);
        }
      })
    })
  }

      

      // var dataArr = data.split(",");

      // console.log(dataArr);
