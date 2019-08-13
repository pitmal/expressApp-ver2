const express = require("express");
const router = express.Router();
const News = require("../models/news");

/* GET home page. */
router.get("/", (req, res) => {
  //   const apiData = News.find({}, (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.json(data);
  //     }
  //   })
  //     .sort({ date: -1 })
  //     .select("_id title description");
  // });
  const query = req.query.search || "";
  const findNews = News.find({ title: new RegExp(query.trim()) })
    .sort({
      date: -1
    })
    .select("_id title description date");
  findNews.exec((err, dataNews) => {
    if (err) {
      console.log(err);
    } else {
      res.json(dataNews);
    }
  });
});
module.exports = router;
