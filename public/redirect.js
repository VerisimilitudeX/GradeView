var loggedIn = false;

function auth(body) {
    return fetch("./auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(res => res.text());
}

function studentInfo(funct) {
    auth({ action: "stinfo" }).then(input => {
        var data = JSON.parse(input);
        console.log(data);
        funct(data);
    });
}

function attendance(funct) {
    auth({ action: "attendance" }).then(input => {
        var data = JSON.parse(input);
        console.log(data);
        funct(data);
    });
}

function gradebook(funct) {
    auth({ action: "gradebook" }).then(input => {
        var data = JSON.parse(input);
        console.log(data);
        funct(data);
    });
}

function schedule(funct) {
    auth({ action: "schedule" }).then(input => {
        var data = JSON.parse(input);
        console.log(data);
        funct(data);
    });
}

function check(funct) {
    auth({ action: "check" }).then(input => {
        if (input == "false") {
            window.location.replace(window.location.origin + "/login");
        } else {
            loggedIn = true;
            console.log(input);
            funct(input);
        }
    });
}