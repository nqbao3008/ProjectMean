'use strict';
const Category = require('../models/Category');

module.exports = {  
    Create_category: async(req, res, next) => {
        const newCategory = new Category(req.body);
        const category = await newCategory.save();
        res.status(201).json(category);
    },

    Search_all_categories: async(req, res, next) => {
        const categories = await Category.find({});
        res.status(200).json(categories);
    },

    Search_a_category: async(req, res, next) => {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        res.status(200).json(category);

    },

    Update_Category: async(req, res, next) => {
        const { categoryId } = req.params;
        const newCategory = req.body;
        const result = await Category.findOneAndUpdate({ _id: categoryId}, newCategory, { new: true });
        res.status(200).json(result);
    },

    Delete_Category: async(req, res, next) => {
        const { categoryId } = req.params;
        const result = await Category.findByIdAndRemove({ _id: categoryId});
        res.status(200).json(result);
    },
}