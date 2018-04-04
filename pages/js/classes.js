var CheckoutCart = new Cart();

class Product {
    constructor(name, image, price, maker) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.maker = maker;
    };

    AddToCart() {
        CheckoutCart.add(this);
    };

    GetHtml() {
        return `<td>${this.name}</td> 
        <td> <img class="image" src="${this.image}" alt="Image not found"> </td> 
        <td>${this.maker}</td>
        <td>$ ${this.price}</td>
        <td><button onclick=${AddToCart}>Add to cart</button>`
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