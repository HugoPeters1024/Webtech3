class Product {
    constructor(name, image, price, maker, pid, cid) {
        this.name = name;
        this.price = `<span class="dollars">${Number(price).toLocaleString('en')}</span>`;
        this.image = image;
        this.maker = maker;
        this.product_id = pid;
        this.cat_id = cid;
        this.clicker = function(event) {
            build("confirm_product.html", buildProductConfirmPage, this.product_id);
        };
    };
    
    GetRowEntry() {
        var row = document.createElement("TR");
        var tdname = document.createElement("TD");
        tdname.innerHTML = this.name;
        var tdimage = document.createElement("TD");
        tdimage.innerHTML = `<img class="image" src="${this.image}" alt="Image not found">`
        var tdmaker = document.createElement("TD");
        tdmaker.innerHTML = this.maker;
        var tdprice = document.createElement("TD");
        tdprice.innerHTML = this.price;
        var tdbutton = document.createElement("TD");
        var but = document.createElement("BUTTON");
        tdbutton.appendChild(but);
        but.innerHTML = "Buy";
        //Just make the entire row clickable
        row.addEventListener("click", this.clicker.bind(this), false);

        row.appendChild(tdname);
        row.appendChild(tdimage);
        row.appendChild(tdmaker);
        row.appendChild(tdprice);
        row.appendChild(tdbutton);
        return row;
    };

    GetHistoryRowEntry(date) {
        var row = document.createElement("TR");
        var tdname = document.createElement("TD");
        tdname.innerHTML = this.name;
        var tdimage = document.createElement("TD");
        tdimage.innerHTML = `<img class="image" src="${this.image}" alt="Image not found">`
        var tdprice = document.createElement("TD");
        tdprice.innerHTML = this.price;

        var tddate = document.createElement("TD");

        var options = {  
            year: "numeric", month: "2-digit",  
            day: "numeric", hour: "2-digit", minute: "2-digit"  
        }; 
        tddate.innerHTML = new Date(date).toLocaleTimeString("en-us", options);
        //Just make the entire row clickable
        row.addEventListener("click", this.clicker.bind(this), false);

        row.appendChild(tdname);
        row.appendChild(tdimage);
        row.appendChild(tdprice);
        row.appendChild(tddate);
        return row;
    }
}

class Category {
    constructor(name, cat_id, parent) {
        this.name = name;
        this.cat_id = cat_id;
        this.parent = parent;
        this.items = [];
        this.children = [];
        this.clicker = function(event) {
            var con = "" + this.cat_id;
            this.children.forEach(c => {
                con += c.cat_id;
            })
            SetState("cat_id", con);
            build("products.html");
        }
    }

    AddSubCategory(cat) {
        this.children.push(cat);
    }

    GetSum() {
        var sum = 0;
        this.children.forEach(child => {
            sum += child.GetSum();
        });
        return sum + this.items.length;
    }

    GetTree() {
        if (this.GetSum() > 0)
        {
            var root = document.createElement("LI");
            root.innerHTML = this.name + "(" + this.GetSum() + ")";
            var el = document.createElement("UL");
            el.setAttribute("class", "cat_list_sub");
            this.children.forEach(child => {
                var c = child.GetTree()
                if (c)
                    el.appendChild(c);
            });
            if (el.firstChild)
                root.appendChild(el);
            root.addEventListener("click", this.clicker.bind(this));
            return root;
        }
        return null;
    }
}
