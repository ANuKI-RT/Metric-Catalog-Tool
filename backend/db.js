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
    id: Number,
    title: String
});

const itemSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    metricSource: String,
    metricId: String,
    formula: String,
    metrictype: String,
    category: String,
    subcategory: String,
    developementphase: String,
    metricuser: String,
    metricproducer: String,
    idjoint: String,
    projectId: String
});

const Item = mongoose.model('Item', itemSchema);

const Project = mongoose.model('Project', projectSchema);

module.exports = {
    init,
    mongoose,
    Project,
    Item
}