'use strict';
const express = require('express'),
    mongoose = require('mongoose'),
    ProductModel = require('../models/Product'),
    CartModel = require('../models/Cart'),
    ejs = require('ejs'),
    app = express();

module.exports.createAProduct = (req, res) => {
    const name = req.body.name;
    const desc = req.body.description;
    const price = req.body.price;
    //regex
    var newPro = ProductModel({
        name: name,
        description: desc,
        price: price
    });
    
    newPro.save(function (err, produtc) {
        if (!err) {
            ejs.renderFile('./api/view/product.ejs', {
                errMes: "Successful!"
            }, (err, html) => {
                res.end(html);
            });
        } else {
            ejs.renderFile('./api/view/product.ejs', {
                errMes: err
            }, (err, html) => {
                res.end(html);
            });
        }
    });
};

module.exports.searchProduct = (req, res) => {
    ProductModel.find({ name: req.params.search }, function (err, products) {
        if (err)
            res.send(err);
        ejs.renderFile('./api/view/productList.ejs', { products: products ? products : [] }, (err, html) => {
            if (err) {
                res.send(err);
            }
            res.end(html);
        });
    });
}

module.exports.readAllProduct = (req, res) => {
    ProductModel.find({}, function (err, products) {
        if (err)
            res.send(err);
        ejs.renderFile('./api/view/productList.ejs', { products: products ? products : [] }, (err, html) => {
            if (err) {
                res.send(err);
            }
            res.end(html);
        });
    });
};

module.exports.addProductsToCart = (req, res) => {
    console.dir(req.body);
    if (req.body.products.length > 0) {
        let products = req.body.products.split(',');
        for (let i = 0; i < products.length; i++) {
            var productId = products[i];
            var cart = new CartModel(req.session.cart ? req.session.cart : {});
            ProductModel.findById(productId, function (err, product) {
                if (err)
                    res.send(err);
                cart.add(product, product._id);
                if (i === products.length - 1) {
                    req.session.cart = cart;
                    req.session.save(function (err) {
                        // session saved
                        req.session.reload(function (err) {
                            // session updated
                            res.redirect('/cart');
                        })
                    })
                }
            });
        }
    } else {
        res.redirect('/cart');
    }
};

