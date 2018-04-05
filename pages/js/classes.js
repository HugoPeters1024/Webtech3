class Product {
    constructor(name, image, price, maker, pid) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.maker = maker;
        this.product_id = pid;
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
        but.addEventListener("click", function() { build("confirm_product.html", buildProductConfirmPage, JSON.parse(this)) });

        row.appendChild(tdname);
        row.appendChild(tdimage);
        row.appendChild(tdmaker);
        row.appendChild(tdprice);
        row.appendChild(tdbutton);
        return row;
    };
}
