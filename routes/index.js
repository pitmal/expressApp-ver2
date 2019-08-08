const express = require("express");
const router = express.Router();
const userLogin = "admin";
const userPassword = "123";

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res) => {
  if (req.session.admin) {
    res.redirect("/admin");
  } else {
    res.render("login", { title: "Login" });
  }
});
router.post("/login", (req, res) => {
  // console.log(req.body.login);
  const { login, password } = req.body;
  if (login === userLogin && password === userPassword) {
    req.session.admin = 1;
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
