const express = require("express");
const router = express.Router();
const News = require("../models/news");

/* GET home page. */
router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("/login");
    return;
  }
  next();
});
router.get("/", (req, res) => {
  News.find({}, (err, newsData) => {
    if (err) {
      console.log(err);
    } else {
      res.render("./admin/index", { title: "Admin", newsData });
      return;
    }
    res.render("./admin/index", { title: "Admin" });
  }).sort({ date: -1 });
});

router.get(`/delete/:id`, (req, res) => {
  console.log(req.params.id);
  News.findById({ _id: req.params.id }, (err, deletedNews) => {
    if (err) {
      console.log("Bład przy wyszukiwaniu usuwanego news");
    } else {
      News.deleteOne({ _id: req.params.id }, err => {
        console.log("usuniete");
        res.redirect("/admin");
      });
    }
  });
  // res.render("./admin/index", { title: "Admin" });
});
router.get("/add", (req, res) => {
  res.render("./admin/news-form", {
    title: "Dodaj news",
    errors: {},
    body: {}
  });
});
router.post("/add", (req, res) => {
  const body = req.body;
  const news = new News({
    title: body.title,
    description: body.description
  });
  const errors = news.validateSync();
  news.save(err => {
    if (err) {
      res.render("./admin/news-form", { title: "Dodaj news", errors, body });
    } else {
      res.redirect("/admin");
    }
  });
});

module.exports = router;
