var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var quizSchema = new Schema({
  title: { type: String },
  vote: { type: Number }
});
module.exports = mongoose.model("Quiz", quizSchema);
