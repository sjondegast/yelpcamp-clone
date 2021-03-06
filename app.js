var express         = require("express"),
    app             = express(),        
    bodyParser      = require("body-parser"),                   
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    flash           = require("connect-flash"),
    moment          = require("moment"),
    seedDB          = require("./seeds");

//REQUIRING ROUTES
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

// APP CONFIGURATION
// mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
mongoose.connect('mongodb://sjondegast:2526BE@ds233323.mlab.com:33323/yelpcamp', {
    useNewUrlParser: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hello World",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// because of app.use this will be available in every document/template!
app.use(function (req, res, next) {
    res.locals.moment = moment;
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//PREFIX TO ROUTES BETWEEN ""
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//  LOCAL SETUP, RUN LOCALLY @ LOCALHOST DO NOT USE FOR PRODUCTION
app.listen(8080, "localhost", function () {
    console.log("YelpCamp Server Has Started");
});

//  PRODUCTION APP.LISTEN FOR HEROKU 
// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log("Yelpcamp server has Started!");
// });

