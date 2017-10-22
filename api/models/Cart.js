'use strict';
module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {product: item, quantity: 0, price: 0};
        }
        cartItem.quantity++;
        cartItem.price = cartItem.product.price * cartItem.quantity;
        this.totalItems++;
        this.totalPrice += cartItem.product.price;
    };

    this.remove = function(id) {
        if (typeof this.items[id] !== 'undefined') {
            var cartItem = this.items[id];
            var productPrice = cartItem.product.price * 1;
            cartItem.quantity--;
            cartItem.price -= productPrice;
            this.totalItems --;
            this.totalPrice -= productPrice;
            if (cartItem.quantity === 0) {
                delete this.items[id];
            }
        }
    };
    
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            let object = this.items[id];
            arr.push(this.items[id]);
        }
        for(let item in arr) {
            console.dir(item);
        }
        return arr;
    };
};