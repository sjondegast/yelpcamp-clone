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

app.get("/", function (req, res) {
    res.render("landing");   
});

app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB: Campgrounds.find()
    Campground.find({}, function (err, campgrounds) {
       if (err) {
           console.log(err);           
       } else {
           res.render("campgrounds", {campgrounds: campgrounds});
       }
    });
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

