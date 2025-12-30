const express = require("express");
const router = express.Router();  

const wrapAsync = require("../utils/wrapAsync.js");

const passport = require("passport");

const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

const { isLoggedIn } = require("../middleware");

router.get("/signup", userController.renderSignupForm);

router.post(
  "/signup",
  wrapAsync(userController.signup) 
);

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl, 

  passport.authenticate("local", {
    failureRedirect: '/login', 
    failureFlash: true       
  }),

  userController.login 
);

router.get("/logout", userController.logout);

router.get("/bookings", isLoggedIn, wrapAsync(userController.renderBookings));

module.exports = router;

