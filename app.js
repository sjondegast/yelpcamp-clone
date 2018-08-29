var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    { name: "Salmon Creek", image: "https://s3.amazonaws.com/imagescloud/images/cards/camping/meilleurs-choix-camping-parcs.jpg" },
    { name: "Granite Hill", image: "https://s3.amazonaws.com/imagescloud/images/cards/camping/meilleurs-choix-camping-parcs.jpg" },
    { name: "Mountain Goat's Rest", image: "https://s3.amazonaws.com/imagescloud/images/cards/camping/meilleurs-choix-camping-parcs.jpg" }
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

//wat gebleven bij 8.22 min