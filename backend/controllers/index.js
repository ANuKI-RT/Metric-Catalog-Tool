'use strict';

const IndexModel = require('../models/index');

exports.index = function (req, res) {
    const model = new IndexModel();
    res.render('index', model);
};

exports.setLocale = function (req, res) {
    res.cookie('locale', req.params.locale);
    res.redirect('/');
};
