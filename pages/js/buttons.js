function config_buttons() {
    //Home button
    var but_home = document.getElementById("but_home");
    but_home.addEventListener("click", function() { build("home.html")});

    var but_profile = document.getElementById("but_profile");
    but_profile.addEventListener("click", 
    function() {
        build("profile.html", buildUserProfile)
    });
    AddStateListener("LoggedIn", function(value) {
        var but = document.getElementById("but_profile");
        if (value)
            but.style.display = "block";
        else
            but.style.display = "none";
    }, true)

    var but_login = document.getElementById("but_login");
    but_login.addEventListener("click", function() { 
        if (GetState("LoggedIn")) {
            SetState("LoggedIn", false);
            SetState("CurrentPage", "home.html");
            build();
        }
        else
            build("login.html");
    });
    AddStateListener("LoggedIn", function(value) {
        var but = document.getElementById("but_login");
        if (value)
            but.innerHTML = "Logout";
        else
            but.innerHTML = "Login";

        console.log("Login changed!");
    }, true);
}