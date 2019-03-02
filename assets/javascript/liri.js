// require("dotenv").config();

// var keys = require("./keys.js");
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
// var input = process.argv[3];
var search = process.argv[3];
// const fs = require('fs');

// add moment.js //

// switch (input) {
//   case "concert-this":
//     concertThis();
//     break;

//   case "movie-this":
//     movieThis();
//     break;

//   case "spotify-this-song":
//     spotifyThisSong();
//     break;

//   case "do-what-it-says":
//     doWhatItSays();
//     break;
// };

// Axios Call - OMDb Include the axios npm package (Don't forget to run "npm install axios" in this folder first!) //

// function movieThis() {
//   var axios = require("axios");

//   var queryUrl = "http://www.omdbapi.com/?t=" + search + "&plot=short&apikey=trilogy";

//   axios.get(queryUrl).then(
//     function (response) {

//       console.log(response);

//       // if (!search) {
//       //   search = "Mr. Nobody"
//       // }

//       console.log("=========================")
//       console.log("Movie Title: " + response.data.Title);
//       console.log("Release Year: " + response.data.Year);
//       console.log("Rating: " + response.data.imdbRating);
//       console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
//       console.log("Country: " + response.data.Country);
//       console.log("Language: " + response.data.Language);
//       console.log("Plot: " + response.data.Plot);
//       console.log("Actors: " + response.data.Actors);
//       console.log("==========================");

//     }
//   );
// }

// movieThis();

function concertThis() {
  var axios = require("axios");

  var queryUrlTwo = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp&limit=5";

  axios.get(queryUrlTwo).then(
    function (response) {

      console.log("=========================")
      console.log("Venue: " + response.data.venue.name);
      console.log("Location: " + response.data.venue.city);
      console.log("Event Date: " + response.data.datetime); // moment .js use here //
      console.log("==========================");
    }
  );
}

concertThis();

// function spotifyThisSong() {
//   if (!search) {
//     search = "The Sign by Ace of Base"
//   }

//   spotify.search({ type: "track", query: search }, function (err, result) {

//     if (err) {
//       console.log("Error occurred: " + err);
//     }

//     console.log("Artist(s): " + JSON.stringify(result.tracks.artists));
//     console.log("Song Name: " + JSON.stringify(result.tracks.song));
//     console.log("Preview Link: " + JSON.stringify(result.tracks.external_urls));
//     console.log("Album: " + JSON.stringify(results.tracks.name));

//   });

// }

// function doWhatItSays() {
//   if (search === "do-what-it-says") {
//     fs.readFile("random.txt", "utf8", function (error, data) {

//       if (error) {
//         return console.log(error);
//       }

//       console.log(data);

//       var dataArr = data.split(",");

//       console.log(dataArr);

//     });
//   }

// }
// doWhatItSays();
