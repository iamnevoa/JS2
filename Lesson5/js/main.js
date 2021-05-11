const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    isVisibleCart: false,
    products: [],
    productsFiltered: [],
    basket: [],
    imgCatalog: 'https://via.placeholder.com/150',
    imgCart: 'https://via.placeholder.com/50x100',
    searchLine: '',

  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let added = this.basket.find(item => item.id_product === product.id_product);
            if (added) {
              added.quantity++;
            } else {
              this.basket.push({ ...product, quantity: 1 });
            }
          }
        })
    },
    removeProduct(item) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              this.basket.splice(this.basket.indexOf(item), 1)
            }
          }
        })
    },
    filterGoods() {
      let regexp = new RegExp(this.search, 'i');
      this.productsFiltered = this.products.filter(item => regexp.test(item.product_name));
    },
  },

  created() {

    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let item of data.contents) {
          this.basket.push(item);
        }

      });
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let item of data) {
          this.products.push(item);
          this.productsFiltered.push(item);
        }
      });
  },
  computed: {
    cartTotal: function () {
      if (this.basket.length > 0) {
        return 'Итого: ' + this.basket.reduce((total, item) => total + item.quantity * item.price, 0) + '₽';
      }
      else return 'Корзина пуста.';
    },
    emptyCatalog: function () {
      if (this.products.length < 1)
        return true;
    }
  }
});



