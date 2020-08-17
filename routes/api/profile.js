const express = require("express");
const route = express.Router();

// Route: Get api/users/test
// Desc: Tests users route
// Access: Public
route.get("/test", (req, res) => res.json({ msg: "Test going great!!!" }));

module.exports = route;
