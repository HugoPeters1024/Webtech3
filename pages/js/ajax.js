function build(file, callback) {
    if (!file)
        file = GetState("CurrentPage");
    SetState("CurrentPage", file);
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() {
        var page= document.getElementById("page");
        page.innerHTML = this.responseText;
        if (callback) { callback(); return; };
        if (file == "profile.html") buildUserProfile();
        if (file == "products.html") buildProductPage();
        if (file == "history.html") buildHistoryPage();
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
        var obj;
        try {
            obj = JSON.parse(this.responseText);
        }
        catch(err) {
            alert("invalid response, not a JSON object");
            return;
        }
        if (obj.err) {
            alert(obj.err);
            return;
        }

        for(var item in obj)
        {
            element = document.getElementById(item);
            if (element) {
                element.innerHTML = obj[item];
            }
        }
    });
    req.open("POST", "user", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(`{"token" : "${GetState("token")}"}`);
}

function buildProductPage()
{
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() {
        //alert(this.responseText);
        var list = JSON.parse(this.responseText);
        var table = document.getElementById("products_table")
        for(var i=0; i<list.length; ++i)
        {
            var obj = list[i];
            var product = new Product(obj.name, obj.image, obj.price, obj.maker, obj.product_id);
            var row = document.createElement("tr");
            row.innerHTML = product.GetHtml();
            table.appendChild(row);
        }
    });
    req.open("POST", "products", true);
    req.send();
}

function buildHistoryPage() {
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() {
        var response;
        try {
            response = JSON.parse(this.responseText);
        }
        catch(err) {
            alert("Invalid server response, not a JSON object")
        }
        var table = document.getElementById("history");
        var options = {  
            weekday: "long", year: "numeric", month: "short",  
            day: "numeric", hour: "2-digit", minute: "2-digit"  
        };  
        
        response.forEach(element => {
            var row = document.createElement("TR");
            row.innerHTML = `
            <td>${element.name}</td>
            <td><img src="${element.image}" class="image"></td>
            <td>${element.price}</td>
            <td>${new Date(element.date).toLocaleTimeString("en-us", options)}</td>`;
            table.appendChild(row);
        });
    })
    req.open("POST", "history", true);
    req.setRequestHeader("Content-Type", "application/json");
    var obj = {};
    obj.token = GetState("token");
    req.send(JSON.stringify(obj));
}

function sendLoginRequest() {
    var username = document.getElementById("username");
    var password = document.getElementById("password")
    if (username && password)
    {
        var req = new XMLHttpRequest();
        req.addEventListener("loadend", function () {
            var ret;
            try {
                ret = JSON.parse(this.responseText);
            }
            catch(err) {
                alert("Illegal response, not a JSON object.");
                return;
            }
            if (!ret.err) {
                SetState("LoggedIn", true);
                build("profile.html", buildUserProfile);
                SetState("token", ret.token);
            }
        })
        req.open("POST", "login", true);
        var obj = {};
        obj.username = username.value;
        obj.password = password.value;
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(obj));
    }
    else
    {
        console.log("Could not find login input fields");
    }
}

function buyProduct(productId) {
    if (productId) {
      var req = new XMLHttpRequest();
      req.addEventListener("loadend", function() {
          var res;
          try {
            res = JSON.parse(this.responseText);
          }
          catch(err) {
              console.log("Invalid server response, not a JSON object: " + this.responseText);
          }
          if (res.err) {
              console.log(err);
              return;
          }

          alert("Product bought succesfully!");
      });
      req.open("POST", "buy", true);
      var obj = {};
      obj.product_id = productId;
      obj.token = GetState("token");
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(obj));
    }
}

function sendRegisterRequest() {
    var username = document.getElementById("username");
    var email = document.getElementById("email")
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var address = document.getElementById("address");
    var password = document.getElementById("password");
    var password2 = document.getElementById("password_confirm");
    var warning = document.getElementById("warning");
    warning.innerHTML = "";

    if (username && password && email && password2)
    {
        if (password.value !== password2.value) {
            warning.innerHTML += "Passwords do not match!<br>";
        }
        if (password.value.length < 8)
            warning.innerHTML += "Password must be at least 8 characters<br>"


        if (!warning.innerHTML)
        {
            var req = new XMLHttpRequest();
            req.addEventListener("loadend", function() { alert(this.responseText) });
            req.open("POST", "register", true);
            var obj = {};
            obj.username = username.value;
            obj.email = email.value;
            obj.password = password.value;
            obj.first_name = firstname.value;
            obj.last_name = lastname.value;
            obj.address = address.value;
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify(obj));
        }
    }
}
