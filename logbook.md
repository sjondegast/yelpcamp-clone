npm init
npm install express ejs --save #install express and ejs on the same time
make a .gitignore file, this excludes node modules: touch .gitignore && echo "node_modules/" >> .gitignore
If you allready added the node modules you can run the following: git rm -r --cached node_modules && touch .gitignore && echo "node_modules/" >> .gitignore

touch app.js and do basic setup:
var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("This will be the landing page soon!");    
})

app.listen(8080, "localhost", function () {
    console.log("YelpCamp Server Has Started");
});

npm install nodemon --save
mkdir views + touch views/landing.ejs

Inside app.js set up view engine ejs, this way no .ejs required.
app.set("view engine", "ejs");

*setup new campground POST route
    app.post("/campgrounds", function(req, res){
    //get data from form and add to campground array
    //redirect back to campgrounds page
});
# if you use app.post you can name it the same as the app.get because one is for adding content and the other for showing it. 
*add in body-parser
npm install body-parser --save
var bodyParser = require("body-parser);
app.use(bodyParser.urlencoded({extended: true}));
*Setup route to show form
*add basic unstyled form

-----mongodb-----
terminal:
installation: brew install mongodb
Create a directory: mkdir root/data
    the root directory is the directory of the project, in this case it's YelpCamp. this is not de default, so we need  to tell mongodb we're it is.
first we have to get the full path of the directory in the terminal:
cd into data, then type + enter/return: pwd.
result: /Users/sjondegast/stack/Development/YelpCamp/data
point mongodb to the right directory #data: 
mongod --dbpath /Users/sjondegast/stack/Development/YelpCamp/data --nojounal
Give mongodb read/write permissions: 
add the data folder for mongodb to the gitignore file!!!

This down here you have to do from the data directory or specify the path.
to start, use mongod to start demon.
In another terminal window do mongo, this will start the server
ctrl + C will stop the server

inside the terminal:
mongod, mongo, help, show dbs, use, insert, find, update, remove

example: > --help will provide info
        > db.use.nameOfDatabase

7 Sept 2018 -- adding Mongoose
- new git branch + change to new branch: 
git checkout -b addingMongoose
- install mongoose:
npm install mongoose --save
- check package.json for mongoose
- var mongoose require: 
var mongoose = require("mongoose");
- mongoose.connect: 
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
- got error because the server/database wasn't started...
- campgroundSchema:
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
- var Campground model en schema eraan toevoegen, use capital letters for var! 
var Campground = mongoose.model("Campground", campgroundSchema);
- removed the array with campgrounds
- changed app.get and set it up to use the db yelp_camp and used campgrounds.find() to get all the objects from the array.
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
- the campgrounds from the callbackfunctions inside Campground.find() revers to the line at the end of -> res.render("campgrounds", {campgrounds: campgrounds});

- add new campground to DB inside of app.post("/campgrounds", function(req, res) in app.js:

Campground.create(newCampground, function (err, newCampground) {
    if (err) {
        console.log(err);
    } else {
        console.log("ADDED NEW CAMPGROUND TO DB: ");
        console.log(newCampground);
    }
});

- add new RESTFULL route, SHOW and this will show details about one campground
app.get("/campgrounds/:id", function (req, res) {
    res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
});
#this needs to be after campgrounds/new route because otherwise it will be treated as campgrounds/:id!!!!!

- add description to campgroundSchema
- remove all campgrounds from db, this happends sometimes. In this case we added a description to the schema, because of this we empty the db.
- first make sure you are in the right place!!
show collections
db.campgrounds.find()
db.campgrounds.drop() #this will drop all campgrounds from the collection
if succesfull it will say true
- add new campground to db with description.
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

- app.get show page
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided ID
    //render show template with that campground
    res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
});

- render show page:
res.render("show");
- create template:
terminal: touch views/show.ejs





RESTFUL ROUTES

name    url                 verb    desc
==========================================================
INDEX   /campgrounds        GET     Display a list of all campgrounds
NEW     /campgrounds/new    GET     Display a form to make a new campground
CREATE  /campgrounds        POST    Add new campground to DB
SHOW    /campgrounds/:id    GET     Shows info about one campground


----- Q&A ----
what is package-lock.json?
VS Code code completion for node, express etc.
VS Visual Code, how to set it up correctly?!

