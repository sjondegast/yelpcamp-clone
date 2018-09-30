var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
        name: "Clouds's Rest",
        image: "https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=053f91dd9aee1cc7bc5cafca28cb625c&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor amet snackwave franzen disrupt, try-hard hexagon vinyl cronut brooklyn cloud bread mumblecore marfa fixie hot chicken. Cray adaptogen iceland tofu palo santo shaman 3 wolf moon. Next level intelligentsia small batch cornhole tattooed blog. YOLO vexillologist vice, pug street art synth tumblr typewriter gochujang hexagon twee jean shorts. Sartorial jean shorts prism, narwhal kitsch tilde bitters ramps small batch artisan. Cronut bushwick photo booth, 90's etsy tofu humblebrag prism."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor amet snackwave franzen disrupt, try-hard hexagon vinyl cronut brooklyn cloud bread mumblecore marfa fixie hot chicken. Cray adaptogen iceland tofu palo santo shaman 3 wolf moon. Next level intelligentsia small batch cornhole tattooed blog. YOLO vexillologist vice, pug street art synth tumblr typewriter gochujang hexagon twee jean shorts. Sartorial jean shorts prism, narwhal kitsch tilde bitters ramps small batch artisan. Cronut bushwick photo booth, 90's etsy tofu humblebrag prism."
    },
    {
        name: "Canyon flour",
        image: "https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=74b892f0ae4c8ca51497e2ec4d1aefba&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor amet snackwave franzen disrupt, try-hard hexagon vinyl cronut brooklyn cloud bread mumblecore marfa fixie hot chicken. Cray adaptogen iceland tofu palo santo shaman 3 wolf moon. Next level intelligentsia small batch cornhole tattooed blog. YOLO vexillologist vice, pug street art synth tumblr typewriter gochujang hexagon twee jean shorts. Sartorial jean shorts prism, narwhal kitsch tilde bitters ramps small batch artisan. Cronut bushwick photo booth, 90's etsy tofu humblebrag prism."
    }
];

function seedDB() {
    //Remove all campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all campgrounds removed from database!!");
            //add a few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        console.log(campground);
                         //add a few comments
                         Comment.create(
                             {
                                 text: "This place is great, but I wish there was internet",
                                 author: "Homer"

                             }, function (err, comment) {
                                 if (err) {
                                     console.log(err);
                                 } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                 }
                             });
                    }
                });
            });
        }
    });
};

module.exports = seedDB;