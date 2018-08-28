var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("This will be the landing page soon!");    
})

app.listen(8080, "localhost", function () {
    console.log("YelpCamp Server Has Started");
});