var Movie = require("./liri");

var movie = new Movie();

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

// if search is null

if(!search){
    search = "moviethis";
}

if(!term){
    term = "Mr.Nobody"
}

if(search === "moviethis") {
    console.log("searching for Movie");
    movie.findMovie(term);
}
else{
    console.log("error")
}
