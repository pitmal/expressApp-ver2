const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  console.log(req.session.admin);
  if (req.session.admin) {
    res.render("admin", { title: "Admin" });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
