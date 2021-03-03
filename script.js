"use strict";

Vue.component("app-goods-list", {
    props: ["goods"],
    template: `<div>
                <app-goods-item v-bind:id="item.id_product" v-bind:name="item.product_name" v-bind:price="item.price" v-for="item in goods">
                </app-goods-item>
            </div>`
});

Vue.component("app-goods-item", {
    props: ["id", "name", "price"],
    template: `
                <div class="goods-item">
                    <div>
                        <div class="choisecart">
                            <button :data-goods-id="id" v-on:click="addToBasket(id)"><img src="Img/cart.png"
                                    alt="cart">Add to
                                Cart</button>
                        </div>
                        <img class="cardImg" v-bind:src="'Img/cardProduct' + id + '.png'"
                            alt="cardProduct">
                        <h3 class="cardProduct"> {{name}}</h3>
                        <p>$ {{price}}</p>
                    </div>
                </div>`
});

Vue.component("app-backet-span", {
    props: ["quantity"],
    template: `<span>there are {{quantity}} of this items in the cart</span>`
});

Vue.component("app-input-search", {
    props: [],
    template: `<input type="search" placeholder="Search" data-id="search">`,
});

Vue.component("app-backet-list", {
    props: ["goods"],
    // data: function () {
    //     return this.basketGoods;
    // },
    template: `
        <div>
            <app-backet-item v-bind:id="item.id_product" v-bind:name="item.product_name" v-bind:price="item.price" v-for="item in goods"></app-backet-item>
        </div>
    `
})

Vue.component("app-backet-item", {
    props: ["name", "id", "price", "quantity"],
    template: `<div>
                    <div class="choisecart">
                        <button data-goods-:id="id" v-on:click="deleteFromBasket(id)"><img src="Img/cart.png"
                                alt="cart">Add to
                            Cart</button>
                    </div>
                    <img class="cardImg" v-bind:src="'Img/cardProduct' + id + '.png'" alt="cardProduct">
                    <h3 class="cardProduct"> {{name}}</h3>
                    <p>$ {{price}}</p>
                    <app-basket-span><slot>{{quantity}}</slot></app-basket-span>
                </div>`
});

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
                    // return this.filteredGoods;
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
