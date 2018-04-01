function build(file, callback) {  
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() { 
        var page= document.getElementById("page");
        page.innerHTML = this.responseText;
        if (callback) callback();
    })

    req.addEventListener("error", function() {
        var page = document.getElementById("page");
        page.innerHTML = `<article>${this.responseText}</article>`;
    })
    req.open("GET", file, true);
    req.send(null);
}

function test() {
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() { alert(this.responseText) });
    req.open("POST", "post", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(`{"method": "SELECT", "table" : "Users"}`); 
}

function buildUserProfile(){
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() { 
        var obj = JSON.parse(this.responseText);
        for(var item in obj)
        {
            element = document.getElementById(item);
            if (element) {
                element.innerHTML = obj[item];
            }
        }
     });
    req.open("POST", "post", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(`{"method": "SELECT", "table" : "Users"}`); 
}

function sendLoginRequest() {
    var username = document.getElementById("username");
    var password = document.getElementById("password")
    if (username && password)
    {
        var req = new XMLHttpRequest();
        req.addEventListener("loadend", function () {
            alert("Login request send!");
        })
        req.open("POST", "login", true);
        req.send(`{"username" : ${username.value}, "password" : ${password.value}`);
    }
    else
    {
        console.log("Could not find login input fields");
    }
}