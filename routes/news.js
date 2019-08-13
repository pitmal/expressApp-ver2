const express = require("express");
const router = express.Router();
const News = require("../models/news");

/* GET home page. */
router.get("/", (req, res, next) => {
  const query = req.query.search || "";
  const findNews = News.find({ title: new RegExp(query.trim()) }).sort({
    date: -1
  });
  findNews.exec((err, dataNews) => {
    if (err) {
      console.log(err);
      res.render("news", { title: "News" });
    } else {
      res.render("news", { title: "News", dataNews, query });
    }
  });
});
module.exports = router;
