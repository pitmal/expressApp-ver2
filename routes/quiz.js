const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");

/* GET home page. */
router.get("/", (req, res, next) => {
  const show = !req.session.vote;
  let sum = 0;
  Quiz.find({}, (err, dataQuiz) => {
    dataQuiz.forEach(item => {
      sum += item.vote;
    });
    res.render("quiz", { title: "Quiz", dataQuiz, show, sum });
  });
});

router.post("/", (req, res) => {
  const quizData = req.body.quiz;

  Quiz.findOne({ title: quizData }, (err, data) => {
    if (err) {
      console.log(err);
      res.render("quiz", { title: "Quiz" });
    } else {
      data.vote = data.vote + 1;
      data.save(() => {
        req.session.vote = 1;
        res.redirect("/quiz");
      });
    }
  });
});

module.exports = router;
