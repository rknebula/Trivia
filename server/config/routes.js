var path = require("path");
var users = require("./../controllers/users");
module.exports = function(app) {
// ~~~~~~~~~~~~~~~~~ LOGIN ~~~~~~~~~~~~~~~~~ //
    app.post("/login", function(req, res) {
        users.login(req, res);
    })

    app.get("/logged_in", function(req, res) {
        users.logged_in(req, res);
    })

    app.get("/logout", function(req, res) {
        users.logout(req, res);
    })

// ~~~~~~~~~~~~~~~~~ QUIZ ~~~~~~~~~~~~~~~~~ //
    app.post("/add_question", function(req, res) {
        users.add_question(req, res);
    })

    app.get("/get_quiz", function(req, res) {
        users.get_quiz(req, res);
    })

    app.post("/grade_quiz", function(req, res) {
        users.grade_quiz(req, res);
    })

// ~~~~~~~~~~~~~~~~~ ADMIN ~~~~~~~~~~~~~~~~~ //
    app.get("/clear", function(req, res) {
        users.clear(req, res);
    })

    app.get("/admin", function(req, res) {
        users.show_all(req, res);
    })

// ~~~~~~~~~~~~~~~~~ CATCH ALL ~~~~~~~~~~~~~~~~~ //
    app.all("**", (request, response) => {
        response.sendFile(path.resolve("./client/dist/index.html"))
    });
}
