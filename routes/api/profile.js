const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load User Model
const User = require("../../models/User");

// Route: Get api/profile/test
// Desc: Tests Profile route
// Access: Public
router.get("/test", (req, res) => res.json({ msg: "Test going great!!!" }));

// Route: GET api/profile
// Desc: Get Current User's Profile
// Access: Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", "name")
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// Route: GET api/profile/handle/:handle
// Desc: Get Profile by Handle
// Access: Private
router.get(
  "/handle/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
      .populate("user", "name")
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch((err) =>
        res.status(404).json({ profile: "There is no profile for this handle" })
      );
  }
);

// Route: GET api/profile/user/:user_id
// Desc: Get Profile by User ID
// Access: Private
router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
      .populate("user", "name")
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch((err) =>
        res.status(404).json({ profile: "There is no profile for this user" })
      );
  }
);

// Route: GET api/profile/all
// Desc: Get All Profiles
// Access: Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.find()
      .populate("user", "name")
      .then((profiles) => {
        if (!profiles) {
          errors.noprofile = "There are no profiles";
          return res.status(404).json(errors);
        }

        return res.json(profiles);
      })
      .catch((err) =>
        res.status(400).json({ profiles: "There are no profiles" })
      );
  }
);

// Route: POST api/profile
// Desc: Create or Edit User's Profile
// Access: Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.displayName) profileFields.displayName = req.body.displayName;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.totalGamesPlayed)
      profileFields.totalGamesPlayed = req.body.totalGamesPlayed;

    // Skills - Split into array
    if (typeof req.body.favGenre !== "undefined") {
      profileFields.favGenre = req.body.favGenre.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.discord) profileFields.social.discord = req.body.discord;
    if (req.body.twitch) profileFields.social.twitch = req.body.twitch;
    if (req.body.steam) profileFields.social.steam = req.body.steam;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        // Create
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            return res.status(404).json(errors);
          }

          // Save Profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

// Route   DELETE api/profile
// Desc    Delete user and profile
// Access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
