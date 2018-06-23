var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    score: {type: Number, default: -1},
}, {timestamps: true});

mongoose.model("User", UserSchema);

var QuestionSchema = new Schema({
    question: String,
    answer: String,
    fake_answer1: String,
    fake_answer2: String,
    chosen: {type: String, default: ""},
}, {timestamps: true});

mongoose.model("Question", QuestionSchema);
