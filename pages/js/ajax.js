function build() {
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() { 
        var page= document.getElementById("page");
        var item = document.createElement("article");
        item.innerHTML = this.responseText;
        page.appendChild(item);
    })
    req.open("GET", "css/main.css", true);
    req.send(null);
}