class Product {
    constructor(name, image, price, maker, pid) {
        this.name = name;
        this.price = `<span class="dollars">${Number(price).toLocaleString('en')}</span>`;
        this.image = image;
        this.maker = maker;
        this.product_id = pid;
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
}
