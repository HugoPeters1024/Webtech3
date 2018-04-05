class Product {
    constructor(name, image, price, maker, pid) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.maker = maker;
        this.product_id = pid;
    };


    GetHtml() {
        return `<td>${this.name}</td>
        <td><img class="image" src="${this.image}" alt="Image not found"> </td>
        <td>${this.maker}</td>
        <td>$ ${this.price}</td>
        <td><button id = "product_button${this.product_id}">Buy</button>`
    };
}
