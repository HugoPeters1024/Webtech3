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
        var but = document.getElementById("but_login");
        if (value)
            but.innerHTML = "Log out";
        else
            but.innerHTML = "Log in";

        console.log("Login changed!");
    }, true);
    var but_login = document.getElementById("but_login");
    but_login.addEventListener("click", function() { build("login.html");});
}