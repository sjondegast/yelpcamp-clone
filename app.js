var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP braking up later..

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    { 
        name: "Granite Hill", 
        image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" 

    }, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    });

var campgrounds = [
    { name: "Salmon Creek", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" },
    { name: "Granite Hill", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" },
    { name: "Salmon Creek", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" },
    { name: "Granite Hill", image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" },
    { name: "Salmon Creek", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" },
    { name: "Granite Hill", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" }
];

app.get("/", function (req, res) {
    res.render("landing");   
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function (req, res) {
   res.render("new"); 
});

app.listen(8080, "localhost", function () {
    console.log("YelpCamp Server Has Started");
});

