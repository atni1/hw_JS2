const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class ProductList{
    constructor(container='.product__wrap'){
        this.container = container;
        this.products = [];
        this.goodsSum = 0;
        this._getProduct()
            .then(data => {
                this.products = data;
                this.render();
                this.productsSum();
            })
    }

    _getProduct(){
        return fetch(`${API}/catalogData.json`)
            .then(text => text.json())
            .catch(error => {
                console.log(error);
            })
    }
    render(){
        let block = document.querySelector(this.container);
        for (const good of this.products) {
            const item = new ProductItem(good);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }


    productsSum(){
        for (const prod of this.products) {
            this.goodsSum += prod.price
        }
        //Как при запросе на сервер сделать вывод стоимости товаров?
    }
}

class ProductItem{
    constructor(good, img='https://via.placeholder.com/360x400'){
        this.title = good.product_name;
        this.price = good.price;
        this.id = good.id_product;
        this.img = img;
    }

    render(){
        return `<div class="product" data-id="${this.id}">
                    <img src="${this.img}">
                    <div class="product__info">
                        <h3>${this.title}</h3>
                        <strong>${this.price}$</strong>
                        <button>Купить</button>
                    </div> 
                </div>`
    }
}

class Cart{
    constructor(header='.cart__product'){
        this.header = header;
        this.cart = [];
        this._addGoods()
            .then(date => {
                this.cart = date.contents;
                // console.log(date.contents);
                this.render();
            })
    }

    _addGoods(){
        return fetch(`${API}/getBasket.json`)
            .then(res => res.json())
            .catch(error => console.log(error))
    }
    render(){
        let headerCart = document.querySelector(this.header);
        for (const elemCart of this.cart) {
            const elementCart = new ElementsCart(elemCart);
            headerCart.insertAdjacentHTML('beforeend',elementCart.render());
        }
    }
    removeGoods() {

    }
    changeGoods() {

    }
}

class ElementsCart{
    constructor(elemCart, img='https://via.placeholder.com/30x50'){
        this.id = elemCart.id_product;
        this.title = elemCart.product_name;
        this.count = elemCart.quantity;
        this.price = elemCart.price;
        this.img = img;
    }

    render(){
        return `<div class="product__cart" data-id="${this.id}">
                    <img src="${this.img}">
                    <div class="product__info__header">
                        <h3>Наименование: ${this.title}</h3>
                        <span>Количество: ${this.count}</span>
                        <strong>Цена: ${this.price}$</strong>
                    </div> 
                </div>`
    }
}

let list = new ProductList();
let cartList = new Cart()
let totalPrice = document.querySelector('.total__price');
totalPrice.insertAdjacentHTML('beforeend',`Общая стоимость товаров: ${list.goodsSum}`)