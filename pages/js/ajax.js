function build(file, callback) {  
    if (!file)
        file = GetState("CurrentPage");
    SetState("CurrentPage", file);
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
    req.send(`{"method": "SELECT", "username" : "admin"}`); 
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
    req.send(`{
        "method": "SELECT", 
        "table" : "Users",
        "username": "admin"}`); 
}

function buildProductPage()
{
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() {
        //alert(this.responseText);
        var list = JSON.parse(this.responseText);
        var table = document.getElementById("products_table");
        for(var i=0; i<list.length; ++i)
        {
           // alert(JSON.stringify(list[i]));
            var obj = list[i];
            var row = document.createElement("tr");
            for(var item in obj)
            {
                var unit = document.createElement("td");
                unit.innerHTML = obj[item];
                row.appendChild(unit);
            }
            table.appendChild(row);
        }
    });
    req.open("POST", "products", true);
    req.send("{}");
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

function sendRegisterRequest() {
    var username = document.getElementById("username");
    var email = document.getElementById("email")
    var password = document.getElementById("password");
    var password2 = document.getElementById("password_confirm");
    if (username && email && password && password2)
    {
        if (!password.value == password2.value) {
            alert("Passwords do not match!");
            return;
        }
    }
}