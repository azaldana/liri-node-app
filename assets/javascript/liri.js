require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var search = process.argv.slice(3).join("+");
const fs = require('fs');
var divider = "\n-------------------------------------------------------------------\n\n";
var moment = require('moment');

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

  if (movie === "") {
    movie = "Mr. Nobody";
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function (response) {

      var jsonData = response.data;

      var showData = [
        "Movie Title: " + jsonData.Title,
        "Release Year: " + jsonData.Year,
        "Rating: " + jsonData.imdbRating,
        "Rotten Tomatoes: " + jsonData.Ratings[1].Value,
        "Country: " + jsonData.Country,
        "Language: " + jsonData.Language,
        "Plot: " + jsonData.Plot,
        "Actors: " + jsonData.Actors,
      ].join('\n\n');

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

      fs.appendFile("log.txt", showData + divider, function (err) {

        if (err) {
          console.log("Error", err);
        }
      
      })
    })

    };

function concertThis(search) {
  var axios = require("axios");
  var artist = search;

  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(
    function (result) {
      var jsonData = result.data;

      for (var i =0; i < jsonData.length; i++){

        var eventData = [
          "Venue: " + jsonData[i].venue.name,
          "Location: " + jsonData[i].venue.city + ", " + jsonData[i].venue.region + ", " + jsonData[i].venue.country,
          "Event Date: " + moment(jsonData[i].datetime).format('L'),
        ].join('\n\n');
  
        console.log("=========================")
        console.log("Venue: " + jsonData[i].venue.name);
        console.log("Location: " + jsonData[i].venue.city + ", " + jsonData[i].venue.region + ", " + jsonData[i].venue.country);
        console.log("Event Date: " + moment(jsonData[i].datetime).format('L'));
        console.log("==========================");
      }

      fs.appendFile("log.txt", eventData + divider, function (err) {

        if (err) {
          console.log("Error", err);
        }
      })
    }
  );
}

function spotifyThisSong(search) {
  var song = search;
  if (song === "") {
    song = "The Sign Ace of Base";
    console.log(song);
  };

  spotify.search({ type: "track", query: song }, function (err, data) {

    if (err) {
      console.log("Error occurred: " + err);
    }

    data = data.tracks.items[0];

      var songData = [
        "Artist(s): " + data.artists[0].name,
        "Song Name: " + data.name,
        "Preview Link: " + data.preview_url,
        "Album: " + data.album.name,
      ].join('\n\n');

    console.log("Artist(s): " + JSON.stringify(data.artists[0].name));
    console.log("Song Name: " + JSON.stringify(data.name));
    console.log("Preview Link: " + JSON.stringify(data.preview_url));
    console.log("Album: " + JSON.stringify(data.album.name));

    fs.appendFile("log.txt", songData + divider, function (err) {

      if (err) {
        console.log("Error", err);
      }
    })

  });

}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    var dataArr = data.split(",");

    console.log(dataArr);

    var input = dataArr[0];
    var search = dataArr[1];

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
    
      default:
        console.log("Please use a valid command.")
        return;
    };

    if (error) {
      return console.log(error);
    }
    console.log(data);

    
    })
  }