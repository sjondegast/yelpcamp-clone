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




----- Q&A ----
what is package-lock.json?
VS Code code completion for node, express etc.
VS Visual Code, how to set it up correctly?!

