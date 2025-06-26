const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl, isLoggedIn} = require("../middleware.js");
const Listing = require("../models/listing.js");

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup))

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local",{failureRedirect: '/login',failureFlash:true}), userController.login)

router.get("/logout", userController.logout);

// View wishlist
router.get("/wishlist", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.render("listings/index.ejs", {
    allListings: user.wishlist,
    req,
    notFound: user.wishlist.length === 0,
    isWishlistView: true,
    currUser: req.user
  });
});

// Add to wishlist
router.post("/wishlist/add/:id", isLoggedIn, async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.params.id } });
  res.redirect("back");
});

// Remove from wishlist
router.post("/wishlist/remove/:id", isLoggedIn, async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.id } });
  res.redirect("back");
});

module.exports = router;
