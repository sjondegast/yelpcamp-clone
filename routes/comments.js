var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

//COMMMENTS NEW
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function (req, res) {
    //look up campground using id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// COMMENT EDIT ROUTE - SHOW FORM
router.get("/:comment_id/edit", middleware.checkCommentsOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {
                campground_id: req.params.id, comment: comment
            });
        }
    })
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentsOwnership, function (req, res) {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updateComment) {
      if (err) {
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});

// DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentsOwnership, function (req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function (err) {
       if (err) {
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

module.exports = router;