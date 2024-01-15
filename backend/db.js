const mongoose = require('mongoose');

async function init() {
    await mongoose.connect('mongodb://projects:projects@127.0.0.1:27017/projects');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const projectSchema = new mongoose.Schema({
    id: Number,
    title: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = {
    init,
    mongoose,
    Project
}