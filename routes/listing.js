const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingcontrollers = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js"); 
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingcontrollers.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingcontrollers.createListing));

// New Route
router.get("/new",isLoggedIn,listingcontrollers.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingcontrollers.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingcontrollers.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingcontrollers.destroyListing));

// Index Route
// router.get("/", wrapAsync(listingcontrollers.index));

// Show Route
// router.get("/:id", wrapAsync(listingcontrollers.showListing));

// Create Route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingcontrollers.createListing));

// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingcontrollers.renderEditForm));

// Update Route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingcontrollers.updateListing));

// Delete Route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingcontrollers.destroyListing));

module.exports = router;