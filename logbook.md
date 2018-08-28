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




----- Q&A ----
what is package-lock.json?
VS Code code completion for node, express etc.
VS Visual Code, how to set it up correctly?!

