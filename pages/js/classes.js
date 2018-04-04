var CheckoutCard = new Card();

class Product {
    constructor(name, image, price, maker) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.maker = maker;
    }

    AddToCart = () => {
        CheckoutCard.add(this);
    }

    GetHtml = () => {
        return `<td>${this.name}</td> <td> <img class="image" src="${this.image}" alt="Image not found"> </td> <td>${this.maker}</td><td>$ ${this.price}</td>`
    }
}

class Card {
    constructor() {
        this.productList = [];
    }

    AddProduct = (product) => {
        this.productList.add(product);
    }
}