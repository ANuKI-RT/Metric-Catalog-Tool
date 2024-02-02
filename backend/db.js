const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

async function init() {
    try {
        await mongoose.connect(process.env.DB_URL);
        // await mongoose.connect('mongodb://projects:projects@127.0.0.1:27017/projects');
        console.log("Successfully connected to DB")

    } catch (error) {
        console.log(error)
    }

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const projectSchema = new mongoose.Schema({
    title: String,
    itemsIds: [ObjectId]
});

const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    metricSource: String,
    metricId: String,
    formula: String,
    metricType: String,
    category: String,
    subcategory: String,
    developementphase: String,
    metricUser: String,
    metricProducer: String,
    idJoint: String,
    minValue: Number,
    maxValue: Number
});

const modifiedItemSchema = new mongoose.Schema({
    itemId: ObjectId,
    title: String,
    description: String,
    metricSource: String,
    metricId: String,
    formula: String,
    metricType: String,
    category: String,
    subcategory: String,
    developementphase: String,
    metricUser: String,
    metricProducer: String,
    idJoint: String,
    minValue: Number,
    maxValue: Number,
    projectId: ObjectId
});

const Item = mongoose.model('Item', itemSchema);

const modifiedItem = mongoose.model('modifiedItem', modifiedItemSchema);

const Project = mongoose.model('Project', projectSchema);

module.exports = {
    init,
    mongoose,
    Project,
    Item,
    modifiedItem
}