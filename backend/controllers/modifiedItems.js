const { default: mongoose } = require('mongoose');
const { modifiedItem, Item } = require('../db');

/**
 * get all items from database
 * @param {*} req
 * @param {*} res
 */
exports.itemListAll = function (req, res) {
    modifiedItem
        .find({})
        .then(data => res.json(data));
}


/**
 * get all items that belong to the project from database
 */
exports.itemList = function (req, res) {
    modifiedItem
        .find({ projectId: req.params?.projId })
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
            apc: req.body.metricApc,
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
    } else {
        res.status(409)
        res.json(itemAlreadyAvailable)
    }
}

exports.addItemsToProject = async function (req, res) {
    await init();
    const { itemIds, projectId } = req.body;


    const items = await Item.find({ 'metricId': { $in: itemIds } });

    if (items.length !== itemIds.length) {
        res.status(404).send({ error: 'Nicht alle Items gefunden.' });
        return;
    }

    const modifiedItems = await Promise.all(items.map(async (item) => {

        const exists = await modifiedItem.findOne({ itemId: item._id, projectId: projectId }).exec();
        if (!exists) {
            const newItem = new modifiedItem({
                itemId: item._id,
                title: item.title,
                description: item.description,
                metricSource: item.metricSource,
                metricId: item.metricId,
                formula: item.formula,
                metricType: item.metricType,
                category: item.category,
                subcategory: item.subcategory,
                apc: item.apc,
                developementphase: item.developementphase,
                metricUser: item.metricUser,
                metricProducer: item.metricProducer,
                idJoint: item.idJoint,
                minValue: item.minValue,
                maxValue: item.maxValue,
                projectId: projectId
            });
            await newItem.save();
            return newItem;
        }
        return exists;
    }));

    res.status(201).json(modifiedItems);
};

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
    const item = await modifiedItem.findById(req.params.itemId).exec();
    item.title = req.body.metricTitle
    item.description = req.body.metricDescription
    item.metricSource = req.body.metricSource
    item.metricId = req.body.metricId
    item.formula = req.body.metricFormula
    item.metricType = req.body.metricType
    item.category = req.body.metricCategory
    item.subcategory = req.body.metricSubcategory
    item.apc = req.body.metricApc
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