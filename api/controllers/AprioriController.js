'use strict';
const Confidence = require('../models/Confidence'),
    ejs = require('ejs'),
    Product = require('../models/Product')


module.exports = {
    create_confidence: function(req, res) {
        const newConfidence = new Confidence(req.body);
        newConfidence.save(function(err, conf) {
            if (err)
                res.send(err);
            res.json(200, { Confidence: conf });
        });
    },

    findAllConfidence: function(req, res) {
        // Confidence.find({}, function (err, conf) {
        //     if (err)
        //         res.send(err);

        //     });

        ejs.renderFile('./api/view/test.ejs', { id1: '' }, (err, html) => {
            res.end(html);
        });
    },

    find_recomendation: function(req, res) {
        var id1 = req.query.id1;
        if (!id1) {
            ejs.renderFile('./api/view/test.ejs', { id1: id1 }, (err, html) => {
                res.end(html);
            });
        } else {
            Confidence.findOne({ 'id1': req.query.id1 })
                .sort({ confidence: -1 })
                .select('confidence')
                .exec(function(err, tmp) {
                

                    if (err) return res.json(err.status, { err: err.message })

                    Confidence.find({ 'id1': req.query.id1 })
                        .where('confidence').equals(tmp.confidence)
                        .exec(function(err, rec) {

                            if (err) return res.json(err.status, { err: err.message })
                            return ejs.renderFile('./api/view/test.ejs', {
                                recomendation: rec,
                                id1: id1
                            }, (err, html) => {
                                res.end(html);
                            })
                            //return res.json(200, { recomendation: rec })



                        })
                })
        }



    }
}