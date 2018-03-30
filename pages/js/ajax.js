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

function test() {
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() { alert(this.responseText) });
    req.open("POST", "http://www.webtech.science.uu.nl/group12/post", true);
    req.setRequestHeader("Content-Type", "application/json");
   // req.setRequestHeader("Access-Control-Allow-Origin", "*");
    //req.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
    //req.setRequestHeader("Allow", "GET POST");
    //req.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    req.send(`{"method": "SELECT", "table" : "Users"}`); 
}