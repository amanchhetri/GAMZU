const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  handle: {
    type: String,
    required: true,
    max: 30,
  },
  displayName: {
    type: String,
    requied: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  totalGamesPlayed: {
    type: Number,
  },
  favGenre: {
    type: [String],
  },
  social: {
    youtube: {
      type: String,
    },
    discord: {
      type: String,
    },
    twitch: {
      type: String,
    },
    steam: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
