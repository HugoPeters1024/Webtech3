//Gets run after every body onload and binds functionality to the buttons in the navigation bar.
function config_buttons() {
    //HOME BUTTON
    var but_home = document.getElementById("but_home");
    but_home.addEventListener("click", function() { build("home.html")});

    //PROFILE BUTTON
    var but_profile = document.getElementById("but_profile");
    but_profile.addEventListener("click", 
    function() {
        build("profile.html")
    });
    AddStateListener("LoggedIn", function(value) {
        var but = document.getElementById("but_profile");
        if (value)
            but.style.display = "block";
        else
            but.style.display = "none";
    }, true)

    //LOGIN BUTTON
    var but_login = document.getElementById("but_login");
    but_login.addEventListener("click", function() { 
        if (GetState("LoggedIn")) {
            var req = new XMLHttpRequest();
            req.addEventListener("loadend", function() {
                SetState("LoggedIn", false);
                SetState("CurrentPage", "home.html");
                build();
            });
            req.open("POST", "logout", true);
            req.setRequestHeader("Content-Type", "application/json");
            var obj = {};
            obj.token = GetState("token");
            req.send(JSON.stringify(obj));
        }
        else
            build("login.html");
    });
    AddStateListener("LoggedIn", function(value) {
        var but = document.getElementById("but_login");
        if (value)
            but.innerHTML = "Logout";
        else {
            but.innerHTML = "Login";
            SetState("token", "");
        }

        console.log("Login changed!");
    }, true);

    //PRODUCTS BUTTON
    var but_products = document.getElementById("but_products");
    but_products.addEventListener("click", function() {
        build("products.html"); 
    });

    //REGISTER BUTTON
    var but_register = document.getElementById("but_register");
    but_register.addEventListener("click", function() {
        build("register.html");
    })
    AddStateListener("LoggedIn", function(value) {
        var but = document.getElementById("but_register");
        if (value)
            but.style.display = "none";
        else
            but.style.display = "block";
    }, true);

    //HISTORY BUTTON
    var but_history = document.getElementById("but_history");
    but_history.addEventListener("click", function() {
        build("history.html");
    });
    AddStateListener("LoggedIn", function(value) {
        var but = document.getElementById("but_history");
        if (value)
            but.style.display = "block";
        else
            but.style.display = "none";
    }, true);
}