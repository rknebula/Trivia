var mongoose = require("mongoose");
var User = mongoose.model("User");
var Question = mongoose.model("Question");

module.exports = {
// ~~~~~~~~~~~~~~~~~ LOGIN ~~~~~~~~~~~~~~~~~ //
    login: function(req, res) {
        User.findOne({ name: req.body.name }, function(e, user) {
            if(!user) {
                User.create({ name: req.body.name }, function(e, user) {
                    req.session.user = user;
                    req.session.save();
                    // console.log("req.session created", req.session.user);
                    res.json({user: req.session.user});
                });
            } else {
                req.session.user = user;
                req.session.save();
                // console.log("req.session found", req.session.user);
                res.json({user: req.session.user});
            }
            // console.log("passing data back from users.js");
        })
    },

    logged_in: function(req, res) {
        if (req.session.user) {
            // console.log("users.js, logged in");
            User.find({}, function(e, users){
                // console.log("all users ================", users);
                res.json({user: req.session.user, users: users});
            })
        } else {
            // console.log("users.js, not logged in");
            res.json({user: null});
        }
    },

    logout: function(req, res) {
        req.session.destroy(function(e){
            if(e) {
                // console.log("logout error");
            } else {
                // console.log("users.js logged out");
                res.redirect("/index");
            }
        });
    },

// ~~~~~~~~~~~~~~~~~ QUIZ ~~~~~~~~~~~~~~~~~ //
    add_question: function(req, res) {
        Question.create({question: req.body.new_question, answer: req.body.answer, fake_answer1: req.body.fake_answer1, fake_answer2: req.body.fake_answer2}, function(e, new_question) {
            new_question.save(function(e) {
                if(e){
                    // console.log("[[[[ERROR]]]]\n", e);
                } else {
                    // console.log("added question:", new_question);
                    res.json({question: new_question});
                }
            })
        })
    },

    get_quiz: function(req, res) {
        var quizset = [];
        Question.count().exec(function (err, count) {
            var random = [];
            random[0] = Math.floor(Math.random() * count);
            // console.log("random:", random);
            Question.findOne()
            .skip(random[0]).exec(function (err, question1) {
                quizset.push(question1);                //first question
                // console.log("quizset 1", quizset);
                random[1] = Math.floor(Math.random() * count);
                // console.log("random:", random);
                while(random[0] == random[1]) {
                    random[1] = Math.floor(Math.random() * count);
                }
                Question.findOne()
                .skip(random[1]).exec(function (err, question2) {
                    quizset.push(question2);
                    // console.log("quizset 2", quizset);  // second question
                    random[2] = Math.floor(Math.random() * count);
                    // console.log("random:", random);
                    while(random[0] == random[2] || random[1] == random[2]) {
                        random[2] = Math.floor(Math.random() * count);
                        // console.log("random:", random);
                    }
                    Question.findOne()
                    .skip(random[2]).exec(function (err, question3) {
                        quizset.push(question3);
                        // console.log("quizset 3", quizset);  // third question
                        res.json({quizset: quizset});
                    })
                })
            })
        })
    },

    grade_quiz: function(req, res) {
        User.findById(req.session.user._id, function(e, user) {
            user.score = req.body.score;
            user.save(function(e, user) {
                req.session.user.score = req.body.score;
                req.session.save()
                // console.log("added score to ------------", user, "and", req.session.user);
                res.json({user: user});
            })
        })
    },

// ~~~~~~~~~~~~~~~~~ ADMIN ~~~~~~~~~~~~~~~~~ //
    clear: function(req, res) {
        Question.remove({}, function(e) {
            res.redirect("/index");
        })
    },

    show_all: function(req, res) {
        User.find({}, function(e, questions) {
            // console.log("show_all: ", questions);
            res.json(questions);
        })
    }
}
