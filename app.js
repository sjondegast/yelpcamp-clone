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
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Granite Hill",
        image: "https://www.justahead.com/wp-content/uploads/2015/08/madison-campground-11.jpg",
        description: "Holy shit that animal is big, is it not?!"
    }, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    }
);

app.get("/", function (req, res) {
    res.render("landing");   
});

//INDEX ROUTE - show all campgrounds
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

//CREATE ROUTE - add new campground to database and redirect to /camgrounds also known as INDEX
app.post("/campgrounds", function(req, res){
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    // add new campground from newCampground var to mongoDB yelp_camp and run callback function.
    Campground.create(newCampground, function (err, newCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log("ADDED NEW CAMPGROUND TO DB: ");
            console.log(newCampground);
        }
    });
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

//NEW ROUTE - show form to create new campground
app.get("/campgrounds/new", function (req, res) {
   res.render("new"); 
});

app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID
    //render show template with that campground
    res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
});

app.listen(8080, "localhost", function () {
    console.log("YelpCamp Server Has Started");
});

