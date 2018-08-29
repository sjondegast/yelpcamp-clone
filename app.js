var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    { name: "Salmon Creek", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f5c571a1ebb7b0_340.jpg" },
    { name: "Granite Hill", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f5c571a1ebb7b0_340.jpg" },
    { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144290f4c97fa1efbd_340.jpg" },
    { name: "Salmon Creek", image: "https://pixabay.com/get/e83db7072ef6053ed1584d05fb1d4e97e07ee3d21cac104496f5c571a1ebb7b0_340.jpg" },
    { name: "Granite Hill", image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg" },
    { name: "Salmon Creek", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f5c571a1ebb7b0_340.jpg" },
    { name: "Granite Hill", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b0144290f4c97fa1efbd_340.jpg" },
    { name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f5c571a1ebb7b0_340.jpg" }
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