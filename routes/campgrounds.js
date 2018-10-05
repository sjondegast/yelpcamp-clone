var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


//INDEX ROUTE - show all campgrounds
router.get("/", function (req, res) {
    // Get all campgrounds from DB: Campgrounds.find()
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds,
                user: req.user
            });
        }
    });
});

//CREATE ROUTE - add new campground to database and redirect to /camgrounds also known as INDEX
router.post("/",isLoggedIn, function (req, res) {
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name,
        image: image,
        description: description,
        author: author
    };
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
router.get("/new",isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/edit", {campground: campground});
       }
    }); 
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id", function (req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, Updatedcampground) {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", function (req, res) {
   Campground.findOneAndRemove(req.params.id, function (err, removedCampground) {
       if (err) {
           res.redirect("/campgrounds/" + req.params.id);
       } else {
           res.redirect("/campgrounds/");
       }
   });
});

//MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = router;