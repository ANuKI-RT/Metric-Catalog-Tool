const { default: mongoose } = require('mongoose');
const {  Item } = require('../db');

/**
 * get all items from database
 * @param {*} req 
 * @param {*} res 
 */
exports.itemList = function (req, res) {
    Item
        .find({})
        .then(data => res.json(data));
}

/**
 * add item to database
 * @param {*} req 
 * @param {*} res 
 */
exports.addItem = async function (req, res) {
    const item = new Item({
        title: req.body.metricTitle,
        description: req.body.metricDescription,
        metricSource: req.body.metricSource,
        metricId: req.body.metricId,
        formula: req.body.metricFormula,
        metricType: req.body.metricType,
        category: req.body.metricCategory,
        subcategory: req.body.metricSubcategory,
        developementphase: req.body.metricDevelopementphase,
        metricUser: req.body.metricUser,
        metricProducer: req.body.metricProducer,
        idJoint: req.body.metricIdJoint,
        minValue: req.body.minValue,
        maxValue: req.body.maxValue
    });
    item.save();
    res.status(201); // Created
    res.json(item);
}

/**
 * delete item from database
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteItem = async function (req, res) {
    const item = await Item.deleteOne({ _id: req.params.itemId }).exec();
    res.json(item);
}

/**
 * update item in database
 * @param {*} req 
 * @param {*} res 
 */
exports.updateItem = async function (req, res) {
    const item = await Item.findById(req.params.itemId).exec();
    item.title = req.body.metricTitle
    item.description = req.body.metricDescription
    item.metricSource = req.body.metricSource
    item.metricId = req.body.metricId
    item.formula = req.body.metricFormula
    item.metricType = req.body.metricType
    item.category = req.body.metricCategory
    item.subcategory = req.body.metricSubcategory
    item.developementphase = req.body.metricDevelopementphase
    item.metricUser = req.body.metricUser
    item.metricProducer = req.body.metricProducer
    item.idJoint = req.body.metricIdJoint
    item.minValue = req.body.minValue
    item.maxValue = req.body.maxValue
    await item.save();
    res.json(item);
}

//export {projectList}