const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };

        xhr.send();
    });
}



// Normal
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];
        this._getProducts()
            .then((data) => {
                this._goods = data;
                this._render();
            });
    }

    sum() {

        return this._goods.reduce((sum, { price }) => sum + price, 0); // Good
    }



    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            // console.log(productObject);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.product_name}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="buy-btn">Купить</button>
                      </div>
                  </div>`;
    }
}

class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="basket-item" data-id="${this.id_product}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3>${this.product_name}</h3>
                          <p>${this.price} \u20bd</p>
                          <button class="delete-btn">Удалить</button>
                      </div>
                  </div>`;


    }
}

class Basket {
    constructor(container = '.basket') {
        this.container = container;
        this.basketGoods = []; // добавленные товары
    }

    addToBasket(id_product) {
        pl._goods.forEach((item) => {
            if (id_product == item.id_product) {
                let addedProduct = {
                    id_product: item.id_product,
                    product_name: item.product_name,
                    price: item.price,
                    img: item.img
                }
            }
        });
        this.basketGoods.push(addedProduct);
        this.render;
    }
    removeFromBasket() {

        this.basketGoods.forEach((item, index) => {
            if (id_product == item.id_product) {
                let getIndex = index;
            }

        });
        this.cartGoods.splice(getIndex, 1);
        this.render();
    }
    calcBasketTotal() { }



    //Просмотр корзины
    render() {
        const block = document.querySelector(this.container);
        this.basketGoods.forEach((good) => {
            block.insertAdjacentHTML('afterbegin', BasketItem.render());
        });
    }
}

const pl = new ProductList();




