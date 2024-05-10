const { default: mongoose } = require('mongoose');
const { modifiedItem } = require('../db');

/**
 * get all items that belong to the project fronm database
 * @param {*} req 
 * @param {*} res 
 */
exports.itemList = function (req, res) {
    modifiedItem
        .find({ _id: req.params?.projId })
        // .exec()
        .then(data => res.json(data));
    // const projectId = req.params.projId;
    // const items = await modifiedItem.find({ projectId }).exec();
    // res.json(items);
}

/**
 * add item to database
 * @param {*} req 
 * @param {*} res 
 */
exports.addItem = async function (req, res) {
    const itemAlreadyAvailable = await modifiedItem.find({ itemId: req.body.itemId, projectId: req.body.projectId }).exec()
    if (itemAlreadyAvailable.length === 0) {
        const item = new modifiedItem({
            itemId: req.body.itemId,
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
            maxValue: req.body.maxValue,
            projectId: req.body.projectId
        });
        item.save();
        res.status(201); // Created
        res.json(item);
    }else{
        res.status(409)
        res.json(itemAlreadyAvailable)
    }
}

/**
 * delete item from database
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteItem = async function (req, res) {
    const item = await modifiedItem.deleteOne({ _id: req.params.itemId }).exec();
    res.json(item);
}

/**
 * update item in database
 * @param {*} req 
 * @param {*} res 
 */
exports.updateItem = async function (req, res) {
    const item = await modifiedItem.findById(req.params.itemId).exec(); //<--- MISSING ARGUMENT?
    item.title = req.body.metricTitle // <---- DUPLICATE CODE (items.js 62:77)
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