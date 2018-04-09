function build(file, callback, arg1, arg2, arg3, arg4) {
    if (!file)
        file = GetState("CurrentPage");
    SetState("CurrentPage", file);
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() {
        var page= document.getElementById("page");
        page.innerHTML = this.responseText;
        if (callback) { callback(arg1, arg2, arg3, arg4); return; };
        if (file == "profile.html") buildUserProfile();
        if (file == "products.html") { 
            var search_text = document.getElementById("search_text").value;
            var limit = GetState("limit");
            buildProductPage(GetState("SearchMaker"), GetState("OrderProducts"), search_text, limit); 
        }
        if (file == "history.html") buildHistoryPage();
        if (file == "confirm_product.html") buildProductConfirmPage();
    });

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
            console.log("invalid response, not a JSON object: " + this.responseText);
            return;
        }
        if (obj.err) {
            console.log(obj.err);
            if (obj.errcode == 32)
            {
                alert(obj.err);
                SetState("LoggedIn", false);
                build("login.html");
            }
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

    var edit = document.getElementById("edit");
    var cancel = document.getElementById("cancel");
    cancel.addEventListener("click", function() { build("profile.html"); });
    edit.addEventListener("click", function() {
        var table = document.getElementById("profile");
        var nodes = [].slice.call(table.getElementsByTagName("TD")).filter(x => x.id).map(x => document.getElementById(x.id));
        if (this.innerHTML == "Edit") {
            nodes.forEach((element) => {
                element.innerHTML = `<input type="text" name="${element.id}" value="${element.innerHTML}">`;
            });
            this.innerHTML = "Save";
            cancel.hidden = false;
        }
        else {
            var vals = nodes.map(x => x.childNodes[0].value);
            var ret = {};
            nodes.forEach((element, i) => {
                ret[element.id] = vals[i];
            })
            ret.token = GetState("token");

            var creq = new XMLHttpRequest();
            creq.addEventListener("loadend", function() {
                var obj = JSON.parse(this.responseText);
                if (obj.err) {
                    document.getElementById("warning").innerHTML = obj.err;
                    return; 
                }
                build("profile.html");
            })
            creq.open("POST", "edit_user", true);
            creq.setRequestHeader("Content-Type", "application/json");

            creq.send(JSON.stringify(ret));

        }
    });
}

function buildProductPage(maker_id, order_id, search_text, limit)
{
    var productlist = [];
    var meta = {};
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() {
        var list = JSON.parse(this.responseText);
        var table = document.getElementById("products_table")
        meta = list[0]; //Meta object
        var maker_search = GetState("SearchMaker");
        for(var i=1; i<list.length; ++i)
        {
            var obj = list[i];
            productlist.push(new Product(obj.name, obj.image, obj.price, obj.maker, obj.product_id));
            var product = productlist[productlist.length-1];
            var row = product.GetRowEntry()
            table.appendChild(row);
        }

        //get the manufacturers
        var manu_req = new XMLHttpRequest();
        manu_req.addEventListener("loadend", function() {
            var ret = JSON.parse(this.responseText);
            var search = document.getElementById("search_maker");
            if (search) {
                ret.forEach(element => {
                    var node = document.createElement("OPTION");
                    node.setAttribute("value", element.maker_id);
                    node.innerHTML = element.name;
                    search.appendChild(node);
                });
            }

            //Recover the search for manufacturer option
            var state = GetState("SearchMaker");
            if (state)
                search.value = state;
            else
                search.value = -1;

            //Recover the order option
            var order = document.getElementById("search_order");
            state = GetState("OrderProducts");
            if (state)
                order.value = state;
            else
                order.value = 0;

            var limit = document.getElementById("limit");
            state = GetState("limit");
            if (state)
                limit.value = state;
            else
                limit.value = 10;

            var offset = parseInt(GetState("offset"));
            if (!offset)
                offset = 0;

            var nav_prev = document.getElementById("nav_prev");
            nav_prev.addEventListener("click", function() {
                SetState("offset", offset - parseInt(limit.value));
                build("products.html");
            })
            if (offset > 0) {
                nav_prev.style.display = "block";
            } else {
                nav_prev.style.display = "none";
            }

            
            var nav_next = document.getElementById("nav_next");
            nav_next.addEventListener("click", function() {
                SetState("offset", offset + parseInt(limit.value));
                build("products.html");
            });
            if (offset + parseInt(limit.value) >= meta.COUNT) {
                nav_next.style.display = "none"
            }
            else {
                nav_next.style.display = "block";
            } 

            
            var go_search = document.getElementById("go_search_text");
            go_search.addEventListener("click", function() {
                SetState("offset", 0);
                var val = document.getElementById("search_text").value.toString();
                build("products.html", buildProductPage, GetState("SearchMaker"), GetState("OrderProducts"), val, GetState("limit"));
            });

            var limit = document.getElementById("limit");
            limit.addEventListener("change", function() {
                SetState("offset", 0);
                SetState("limit", this.value);
                build("products.html");
            })

            search.addEventListener("change", function() {
                SetState("offset", 0)
                SetState("SearchMaker", this.value);
                build("products.html");
            });

            order.addEventListener("change", function() {
                SetState("offset", 0);
                SetState("OrderProducts", this.value);
                build("products.html")
            })
        });
        manu_req.open("POST", "makers", true);
        manu_req.send()

        //Get the categories
        var categories = {};
        cat_req = new XMLHttpRequest();
        cat_req.addEventListener("loadend", function() {
            var obj = JSON.parse(this.responseText);
            for(var i=0; i<obj.length; i++) {
                element = obj[i];
                console.log(element.parent);
                var categorie = new Category(element.name, element.cat_id)
                if (categorie.parent != null) {
                    categories[categorie.parent].AddSubCategory(element);
                } else {
                    var id = element.cat_id;
                    categories.id = element;
                }
            };
            console.log(JSON.stringify(categories));
        });
        cat_req.open("POST", "categories", true);
        cat_req.send()
    });
    req.open("POST", "products", true);
    req.setRequestHeader("Content-Type", "application/json");
    var ret = {};
    if (!maker_id)
        maker_id = -1;
    if (!order_id)
        order_id = 0;
    if (!search_text)
        search_text = "";
    if (!limit)
        limit = 10;
    if (!parseInt(GetState("offset")))
        ret.offset = 0;
    else
        ret.offset = GetState("offset");
    ret.order_id = order_id;
    ret.maker_id = maker_id;
    ret.search_text = search_text;
    ret.limit = limit;
    req.send(JSON.stringify(ret));
}

function buildHistoryPage() {
    var product_list = [];
    var req = new XMLHttpRequest();
    req.addEventListener("loadend", function() {
        var response;
        try {
            response = JSON.parse(this.responseText);
        }
        catch(err) {
            console.log("Invalid server response, not a JSON object: " + this.responseText);
        }
        if (response.err) {
            console.log(response.err);
            if (response.errcode == "32") { //Token no longer valid. 
                SetState("LoggedIn", false);
                build("login.html");
            }
            return;
        }


        var table = document.getElementById("history");
        
        for(var i=0; i<response.length; i++) {
            var obj = response[i];
            product_list.push(new Product(obj.name, obj.image, obj.price, null, obj.product_id));
            var product = product_list[product_list.length - 1];
            var row = product.GetHistoryRowEntry(obj.date);
            table.appendChild(row);
        }
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
            document.getElementById("warning").innerHTML = "" //clear the warning
            var ret;
            try {
                ret = JSON.parse(this.responseText);
            }
            catch(err) {
                document.getElementById("warning").innerHTML = "Illegal response, not a JSON object.";
                return;
            }
            if (ret.err) {
                document.getElementById("warning").innerHTML = ret.err;
                return;
            }
            SetState("LoggedIn", true);
            build("profile.html", buildUserProfile, GetState());
            SetState("token", ret.token);
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
              console.log(res.err);
              if (res.errcode == 32)
                build("login.html");
              return;
          }

          console.log("Product bought succesfully!");
          build("products.html");
      });
      req.open("POST", "buy", true);
      var obj = {};
      obj.product_id = productId;
      obj.token = GetState("token");
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(obj));
    }
}

function buildProductConfirmPage(product_id) 
{
    var current_product;
    if (!product_id)
        product_id = GetState("ViewProduct");
    SetState("ViewProduct", product_id);
    if (product_id) {
        //Product Info
        var req = new XMLHttpRequest();
        req.addEventListener("loadend", function() {
            var obj;
            try {
                obj = JSON.parse(this.responseText);
            }
            catch(err) {
                console.log("Invalid server response, not a JSON object: " + this.responseText);
                return;
            }
            if (obj.err) {
                console.log(obj.err)
                return;
            }
            current_product = new Product(obj.name, obj.image, obj.price, obj.maker, obj.product_id);
            var p = current_product;
            
            document.getElementById("product_name").innerHTML = `<h1>${p.name}</h1>`;
            document.getElementById("product_image").innerHTML = `<img class="large_image" src="${p.image}">`;
            document.getElementById("product_price").innerHTML = p.price;
            document.getElementById("product_maker").innerHTML = p.maker;
            document.getElementById("product_button").innerHTML = `<button onclick="buyProduct(${p.product_id})" id="buy_button">buy</button>`;
        });

        req.open("POST", "product_info", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(`{ "product_id" : "${product_id}"}`);

        //Comments
        var comreq = new XMLHttpRequest();
        comreq.addEventListener("loadend", function() {
            var list = JSON.parse(this.responseText);
            var comments = document.getElementById("comments");
            for(var i=0; i<list.length; i++) {
                var comment = list[i];
                var outer = document.createElement("TR");
                var element = document.createElement("TD");
                outer.appendChild(element);
                element.innerHTML = `<p id="username">${comment.username}</p><p id="comment">${comment.comment}</p>`
                comments.appendChild(outer);
            }
            
        })
        comreq.open("POST", "comments", true);
        comreq.setRequestHeader("Content-Type", "application/json");
        comreq.send(`{ "product_id" : "${product_id}"}`);

        //Comment post
        var text = document.getElementById("comment_text");
        var button = document.getElementById("comment_button");
        button.addEventListener("click", function() {
            var postreq = new XMLHttpRequest();

            var res = {};
            res.product_id = current_product.product_id;
            res.comment = text.value;
            res.token = GetState("token");

            postreq.addEventListener("loadend", function() {
                var response = JSON.parse(this.responseText);
                if (response.err)
                    console.log(response.err);
                    if (response.errcode == 32)
                        build("login.html");
                else
                    build("confirm_product.html");
            })

            postreq.open("POST", "post_comment", true);
            postreq.setRequestHeader("Content-Type", "application/json");
            postreq.send(JSON.stringify(res));
        })
    }
    else {
        document.getElementById("product_name").innerHTML = `This seems to be the wrong page, click <a onclick="build('home.html')">here</a> to return to the home page.`;
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
            req.addEventListener("loadend", function() {
                document.getElementById("warning").innerHTML = ""; //reset warning
                var obj = {};
                try {
                    obj = JSON.parse(this.responseText);
                }
                catch(err) {
                    console.log(err);
                    document.getElementById("warning").innerHTML = "Something went wrong, please report this."
                    return;
                }
                if (obj.err) {
                    document.getElementById("warning").innerHTML = obj.err;
                    return;
                }

                //Registration was succesful
                build("login.html");
            });
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
