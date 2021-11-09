class ProductList{
    constructor(container='.product__wrap'){
        this.container = container;
        this.products = [];
        this.goodsSum = 0;
        this._fetchProducts();
        this.render();
        this.productsSum();
    }

    _fetchProducts(){
        this.products = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
            { title: 'Scarf', price: 100 },
            { title: 'Hat', price: 200 },
        ]
    }

    productsSum(){
        for (const prod of this.products) {
            this.goodsSum += prod.price;
        }
    }

    render(){
        let block = document.querySelector(this.container);
        for (const good of this.products) {
            const item = new ProductItem(good);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
}

class ProductItem{
    constructor(good, img='https://via.placeholder.com/360x400'){
        this.title = good.title;
        this.price = good.price;
        this.img = img;
    }

    render(){
        return `<div class="product">
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
    cleanCart(){

    }
    showProductsCart(){

    }
}

class ElementsCart{
    changeCountProduct(){
        
    }
    
}

let list = new ProductList();
let totalPrice = document.querySelector('.total__price');
totalPrice.insertAdjacentHTML('beforeend',`Общая стоимость товаров: ${list.goodsSum}`)
