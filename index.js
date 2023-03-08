const express = require("express");
const app = express();
const fs = require('fs');
const server = require("http").createServer(app);
const port = 8080;

var db;

fs.readFile('./task_lists.json', 'utf-8', (err, data) => {
    if (err) {
        console.log("Error: " + err);
        return;
    }
    console.log("JSON loaded!");
    db = JSON.parse(data);
    console.log(db);
    createPages();
});

function createPages() {
    for (var x of Object.keys(db)) {
        console.log(x);
    }
}

app.use(express.static("./"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(/^\/task\//, (req, res) => {
    res.sendFile(__dirname + "\\index.html");
});

app.post('/auth', (req, res) => {
    var data = req.body;
    if (data.action == "CheckList") {
        if (db[data.id] == 'undefined') {
            res.send("false");
        } else {
            res.send("true");
        }
    } else if (data.action == "CreateList") {}
})

server.listen(port);