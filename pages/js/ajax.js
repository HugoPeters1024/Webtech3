function build() {
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() {alert(this.responseText);});
    req.open("GET", "css/main.css", true);
    req.send(null);
}