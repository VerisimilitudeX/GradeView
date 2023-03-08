const express = require("express");
const app = express();
const server = require("http").createServer(app);
const session = require("express-session");
const StudentVue = require('studentvue.js');
const port = 3000;
const accountSid = 'AC1c6f2c1bc5464a13f7441a08cb786484';
const authToken = 'e6cf1e3c8d1351ad74d95570b81947b4';
const client = require('twilio')(accountSid, authToken);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/login", (req, res) => {
    if (req.session.username) {
        res.redirect("/home");
    }
    res.sendFile(__dirname + "/login.html");
});
app.get("/", (req, res) => {
    if (req.session.username) {
        res.redirect("/home");
    }
    res.sendFile(__dirname + "/login.html");
});

app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/profile.html");
});

app.post("/auth", (req, res) => {
    var data = req.body;
    if (data.action == "login") {
        var username = data.usr;
        var password = data.pwd;
        console.log(username);
        StudentVue.login('https://wa-bsd405-psv.edupoint.com', username, password)
            .then(client => client.getStudentInfo())
            .then((data) => {
                var result = JSON.parse(data);
                if (result.RT_ERROR != undefined) {
                    res.send(418); // i'm a teapot!
                } else {
                    req.session.username = username;
                    req.session.password = password;
                    req.session.name = result.StudentInfo.FormattedName;
                    console.log("User saved as " + req.session.username);
                    console.log(result);
                    res.send(200);
                }
            });
    } else if (data.action == "check") {
        if (req.session.username) {
            res.send(req.session.name);
        } else {
            res.send("false");
        }
    } else if (data.action == "stinfo") {
        // num, action //
        StudentVue.login('https://wa-bsd405-psv.edupoint.com', req.session.username, req.session.password)
            .then(client => client.getStudentInfo())
            .then((data) => {
                var result = JSON.parse(data);
                if (result.RT_ERROR != undefined) {
                    res.send(418); // i'm a teapot!
                } else {
                    res.send(data);
                }
            })
    } else if (data.action == "attendance") {
        StudentVue.login('https://wa-bsd405-psv.edupoint.com', req.session.username, req.session.password)
            .then(client => client.getAttendance())
            .then((data) => {
                var result = JSON.parse(data);
                console.log(result);
                if (result.RT_ERROR != undefined) {
                    res.send(418); // i'm a teapot!
                } else {
                    res.send(data);
                }
            })
    } else if (data.action == "schedule") {
        StudentVue.login('https://wa-bsd405-psv.edupoint.com', req.session.username, req.session.password)
            .then(client => client.getSchedule())
            .then((data) => {
                var result = JSON.parse(data);
                console.log(result);
                if (result.RT_ERROR != undefined) {
                    res.send(418); // i'm a teapot!
                } else {
                    res.send(data);
                }
            })
    } else if (data.action == "gradebook") {
        StudentVue.login('https://wa-bsd405-psv.edupoint.com', req.session.username, req.session.password)
            .then(client => client.getGradebook())
            .then((data) => {
                var result = JSON.parse(data);
                console.log(result);
                if (result.RT_ERROR != undefined) {
                    res.send(418); // i'm a teapot!
                } else {
                    res.send(data);
                }
            });
    }
});

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/home.html");
});
app.get("/attendance", (req, res) => {
    res.sendFile(__dirname + "/attend.html");
});
app.get("/grades", (req, res) => {
    res.sendFile(__dirname + "/page.html");
});
app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/profile.html");
});
server.listen(port);
console.log("Server started on port " + port);