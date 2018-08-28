var express = require("express");
var app = express();


app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");   
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        { name: "Salmon Creek", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f5c271a4e4b0b8_340.jpg"},
        { name: "Granite Hill", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144290f3c97aaee8b5_340.jpg"},
        { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f5c271a4e4b0b8_340.jpg"}
    ];
    res.render("campgrounds");
});

app.listen(8080, "localhost", function () {
    console.log("YelpCamp Server Has Started");
});