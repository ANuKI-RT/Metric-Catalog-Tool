const { default: mongoose } = require('mongoose');
var { init, Item } = require('../db');

exports.itemList = async function (req, res) {
    await init();
    const items = await Item.find({});
    res.json(items);
}


exports.addItem = async function (req, res) {
    await init();
    const item = new Item({
        title: req.body.metricTitle,
        description: req.body.metricDescription,
        metricSource: req.body.metricSource,
        metricId: req.body.metricId,
        formula: req.body.metricFormula,
        metrictype: req.body.metricType,
        category: req.body.metricCategory,
        subcategory: req.body.metricSubcategory,
        developementphase: req.body.metricDevelopementphase,
        metricuser: req.body.metricUser,
        metricproducer: req.body.metricProducer,
        idjoint: req.body.metricIdJoint
    });
    item.save();
    res.status(201); // Created
    res.json(item);
}

exports.deleteItem = async function (req, res) {
    await init();
    const item = await Item.deleteOne({ _id: req.params.itemId }).exec();
    res.json(item);
}

exports.updateItem = async function (req, res) {
    await init();
    const item = await Item.findById(req.params.itemId).exec();
    item.title = req.body.metricTitle
    item.description = req.body.metricDescription
    item.metricSource = req.body.metricSource
    item.metricId = req.body.metricId
    item.formula = req.body.metricFormula
    item.metrictype = req.body.metricType
    item.category = req.body.metricCategory
    item.subcategory = req.body.metricSubcategory
    item.developementphase = req.body.metricDevelopementphase
    item.metricuser = req.body.metricUser
    item.metricproducer = req.body.metricProducer
    item.idjoint = req.body.metricIdJoint
    await item.save();
    res.json(item);
}

//export {projectList}