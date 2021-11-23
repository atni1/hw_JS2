const products = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Scarf', price: 100 },
    { title: 'Hat', price: 200 },
];

const renderProduct = (title, price, img = 'https://via.placeholder.com/360x400') => {
    return `<div class="product">
                <img src="${img}">
                <div class="product__info">
                    <h3>${title}</h3>
                    <strong>${price}$</strong>
                </div> 
            </div>`
};

const renderProductList = (list) => {
    let productList = list.map(item => renderProduct(item.title, item.price)).join(" ");
    document.querySelector('.product__wrap').innerHTML = productList;

}

renderProductList(products);