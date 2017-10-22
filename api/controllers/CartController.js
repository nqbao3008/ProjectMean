'use strict';
const express = require('express'),
    ejs = require('ejs'),
    CartModel = require('../models/Cart');

module.exports.readAllCart = (req, res) => {
    const cart = new CartModel(req.session.cart ? req.session.cart : {});
    var _array = cart.getItems();
    ejs.renderFile('./api/view/cartList.ejs', { carts: _array }, (err, html) => {
        res.end(html);
    })
};

module.exports.deleteCartItem = (req, res) => {
    const cart = new CartModel(req.session.cart ? req.session.cart : {});
    const _id   = req.params.productId;
    cart.remove(_id);
    var _array = cart.getItems();
    ejs.renderFile('./api/view/cartList.ejs', { carts: _array }, (err, html) => {
        res.end(html);
    })
};

module.exports.readCartItem = (req, res) => {
  const cart = new CartModel(req.session.cart ? req.session.cart : {});
    const _id   = req.params.productId;
    res.json(cart.items[_id]);
};
