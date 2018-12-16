require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


// Movie Info

var getmovie = function (term) {
    if (!term) {
        term = "Mr. Nobody"
    }

    var URL = "http://www.omdbapi.com/?t=%22%20+%20" + term+ "%20%22&y=&plot=short&apikey=trilogy";
    axios.get(URL).then(function (response) {
        var jsonData = response.data;
        var showData = [
            "Title:" + jsonData.Title,
            "Year:" + jsonData.Year,
            "Rating:" + jsonData.imdbRating,
            "Rotten Tomatoes Rating:" + jsonData.Ratings[1].Value,
            "Country:" + jsonData.Country,
            "Language:" + jsonData.Language,
            "Plot:" + jsonData.Plot,
            "Actors:" + jsonData.Actors
        ].join("\n\n");

        console.log("Movie:" + showData);
    })

}


// Bands in Town

var getconcert = function (term) {
    if (!term) {
        term = 'The Beatles';
    }

    
    
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"

    axios.get(URL).then(function (response) {
        var jsonData = response.data[0];
        var showData = [
            "Name of the Venue:" + jsonData.venue.name,
            "Venue Location:" + jsonData.venue.city,
            "Date of the Event:" + moment(jsonData.datetime).format("MM/DD/YYYY")
            +"*************************************"
        ].join("\n\n");

        console.log("Concert:" + showData);
    })

}


// Spotify function to get song

var spotifyMySong = function (term) { 

    if (!term) {
        term = 'The Sign';
    }
    var spotify = new Spotify(keys.spotify);


    var artistsearch = function (artist) {
        return artist.name;
    }

    spotify.search({ type: 'track', query: term, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error for Spotify' + err);
        }

        //loop through every song 
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            var output = [
                'Artist:' + songs[i].artists.map(artistsearch),
                'Song Name:' + songs[i].name,
                'Song Preview: ' + songs[i].preview_url,
                'Album Name: ' + songs[i].album.name,
                '************************'
                
            ].join("\n\n");

            console.log("Songs:" + output);

        }
    });
}

// Do what it says command

var dowhatitsays = function(){
    fs.readFile("random.txt","utf8",function(err,data){
    if(err){
        return console.log("Error for Do What it Says"+err);
    }

    let arr = data.split(",");
    console.log("My random file:"+arr)

    if (arr.length == 2) {
      cli(arr[0], arr[1]);
    } else if (arr.length == 1) {
      cli(arr[0]);
    }
})
}

let cli = function (cases, term) {
    switch (cases) {
        case 'spotify-this-song':
            spotifyMySong(term);
            break;
        case 'movie-this':
            getmovie(term);
            break;
        case 'concert-this':
            getconcert(term);
            break;
        case 'do-what-it-says':
            dowhatitsays(term);
            break;

    }
}

let userinput=process.argv[2];
let cleanuserinput=process.argv.slice(3).join(" ")

cli(userinput,cleanuserinput );





