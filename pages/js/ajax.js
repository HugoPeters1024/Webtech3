function build(file) {
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() { 
        var page= document.getElementById("page");
        page.innerHTML = this.responseText;
    })

    req.addEventListener("error", function() {
        var page = document.getElementById("page");
        page.innerHTML = `<article>${this.responseText}</article>`;
    })
    req.open("GET", file, true);
    req.send(null);
}