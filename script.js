"use strict";

// const mockedGoodsItem = [
//     { id: 1, title: "Shirt", price: 150 },
//     { id: 2, title: "Socks", price: 50 },
//     { id: 3, title: "Jacket", price: 350 },
//     { id: 4, title: "Shoes", price: 250 }
// ];

// let url = new URL("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json");

// const todo = {
//     title: "KEK me",
//     completed: false
// };

// // "https://jsonplaceholder.typicode.com/todos"

// const handleClick = () => {
//     fetch("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json", {
//         // method: "POST",
//         //body: JSON.stringify(todo),
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw 0;
//             }
//         })
//         .then(r => {
//             list.getGoods(r);
//         })
//         .then(r => {
//             list.render();
//         })
//         .catch(e => {
//             alert("Error happened", e);
//         });
// };

// btn.addEventListener("click", handleClick);

// class GoodsList {
//     constructor() {
//         this.goods = [];
//         this.filteredGoods = [];
//         this.input;
//     }

//     __getGoodsItemTemplate(id_product, product_name, price) {
//         return `<div class="goods-item">
//                     <div>
//                         <div class="choisecart">
//                             <button data-goods-id="${id_product}"><img src="Img/cart.png" alt="cart">Add to Cart</button>
//                         </div>
//                         <img class="cardImg" src="Img/cardProduct${id_product}.png" alt="cardProduct">
//                         <h3 class="cardProduct">${product_name}</h3>
//                         <p>$${price}</p>
//                     </div>
//                 </div>`;
//     }

//     handleChange = event => {
//         this.filteredGoods = this.goods.filter(item => {
//             const regexp = new RegExp(event.target.value, "i");
//             const match = item.product_name.match(regexp);
//             return !!match;
//         });
//         console.log(this.filteredGoods);
//         this.render("[data-id=goods]")
//     }

//     init(url) {
//         this.input = document.querySelector("[data-id=search]");
//         this.input.addEventListener('input', this.handleChange);
//         this.getGoods(url).then(() => {
//             this.render("[data-id=goods]");
//         });
//     }

//     getGoods(url) {
//         return fetch(url)
//             .then(r => r.json())
//             .then(r => {
//                 this.goods = r;
//                 this.filteredGoods = this.goods;
//             });
//     }

//     render(selector = ".goods-list") {
//         let goodsList = this.filteredGoods.map(item => this.__getGoodsItemTemplate(item.id_product, item.product_name, item.price));
//         const wrapper = document.querySelector(selector);
//         wrapper.innerHTML = goodsList.join("");
//         wrapper.querySelectorAll("[data-goods-id]").forEach(i => {
//             i.addEventListener("click", () => {
//                 console.log(basket);
//                 const id = i.getAttribute('data-goods-id');
//                 const item = this.goods.find(goodsItem => goodsItem.id === id);
//                 basket.addToBasket(item);
//             });
//         });
//     }
//     // добавьте для GoodList метод определяющий стоимость всех товаров
//     calcAllGoods() {
//         let totalPrice = 0;
//         this.goods.forEach((good) => {
//             totalPrice += good.price;
//             console.log(totalPrice);
//         });
//         let totalGoodsAnswer = "Все товары на сумму $" + totalPrice;
//         document.querySelector(".totalGrand").innerHTML = totalGoodsAnswer;
//     }
// }

// const list = new GoodsList().init(url);

// // list.render();

// // Класс элементов корзины
// class BasketItem {
//     constructor(id, title, price) {
//         this.id = id;
//         this.title = title;
//         this.price = price;
//     }
// }

// // Класс корзины
// class Basket {
//     constructor() {
//         this.goods = [];
//     }

//     getItems() {
//         return this.goods;
//     }

//     // добавление товара в корзину
//     addToBasket = item => {
//         this.goods.push(item);
//         this.render();
//     }

//     // удаление товара из корзины
//     deleteFromBasket(id) {
//         this.goods = this.goods.filter(i => i.id !== id);
//         this.render();
//     }

//     __getGoodsItemTemplate(id_product, product_name, price) {
//         return `<div class="goods-item">
//                     <div>
//                         <div class="choisecart">
//                             <button data-goods-id="${id_product}"><img src="Img/cart.png" alt="cart">Remove from Cart</button>
//                         </div>
//                         <img class="cardImg" src="Img/cardProduct${id_product}.png" alt="cardProduct">
//                         <h5 class="cardProduct">${product_name}</h5>
//                         <p>$${price}</p>
//                     </div>
//                 </div>`;
//     }

//     render() {
//         console.log(this.goods);
//         let goodsList = this.goods.map(item => this.__getGoodsItemTemplate(item.id_product, item.product_name, item.price));
//         const wrapper = document.querySelector("[data-id=basket]");
//         wrapper.innerHTML = goodsList.join("");
//         // wrapper.querySelectorAll("[data-goods-id]").forEach(i => {
//         //     i.addEventListener("click", () => {
//         //         console.log(basket);
//         //         const id = i.getAttribute('data-goods-id');
//         //         const item = this.goods.find(goodsItem => goodsItem.id === id);
//         //         basket.addToBasket(item);
//         //     });
//         // });
//     }

//     // стоимость и количество товаров
//     calcBasket() { }
//     // активирует кнопку Перейти в корзину если там есть товары
//     orderBasket() { }
// }

// const basket = new Basket();

// const app = new Vue({
//     el: "#root",
//     data: {
//         firstName: "Aslan",
//         lastName: "Beshkenov",
//         dateTime: new Date().toISOString(),
//     },
//     methods: {
//         handleClick() {
//             console.log("Clicked");
//         }
//     }
// })

const app = new Vue({
    el: "#root",
    data: {
        goods: [],
        basketGoods: [],
        searchGoods: "",
        errorMessage: "",
        searchLine: "",
        inVisibleCart: false,
    },
    methods: {
        getGoods() {
            fetch("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json")
                .then(r => r.json())
                .then(r => {
                    this.goods = r;
                    this.filteredGoods = this.goods;
                    return this.filteredGoods;
                })
                .catch(e => {
                    this.errorMessage = e;
                });
        },
        handleChange(event) {
            this.filteredGoods = this.goods.filter(item => {
                const regexp = new RegExp(event.target.value, "i");
                const match = regexp.test(item.product_name);
                return !!match;
            });
            console.log(this.filteredGoods);
        },
        addToBasket(item) {
            let existant = false;
            for (const goodsItem of this.basketGoods) {
                if (goodsItem.id === item.id) {
                    existant = true;
                    goodsItem.quantity += 1;
                }
            }

            if (!existant) {
                this.basketGoods.push({ ...item, quantity: 1 });
            }
        },
    },

    computed: {
        filteredGoods: {
            get: function () {
                if (!this.goods.length) this.filteredGoods = [];
                if (!this.searchGoods) this.filteredGoods = this.goods;
                return this.goods.filter(i => i.product_name.toLowerCase().includes(this.searchGoods.toLowerCase()));
            },
            set: function () {

            }
        },
    },
    mounted() {
        this.getGoods();
    },
});