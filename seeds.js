var mongoose = require("mongoose");
var Campground = require("./models/campground");

function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all campgrounds removed from database!!");
        }
    });
};

module.exports = seedDB;
