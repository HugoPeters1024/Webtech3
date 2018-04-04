class Product {
    constructor(name, image, price, maker, pid) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.maker = maker;
        this.product_id = pid;
    };

    AddToCart() {
        GetState("CheckoutCart").add(this);
    };


    GetHtml() {
        return `<td>${this.name}</td>
        <td><img class="image" src="${this.image}" alt="Image not found"> </td>
        <td>${this.maker}</td>
        <td>$ ${this.price}</td>
        <td><button onclick="${buyProduct(this.product_id)}">Add to cart</button>`
    };
}
class Cart {
    constructor() {
        this.productList = [];
    }

    AddProduct(product) {
        this.productList.add(product);
    }
}
