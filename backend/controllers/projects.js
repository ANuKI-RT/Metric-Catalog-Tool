const { default: mongoose } = require('mongoose');
var { init, Project, Item } = require('../db');

exports.projectList = async function (req, res) {
    await init();
    const projects = await Project.find({}, "id title");
    res.json(projects);
}

exports.itemList = async function (req, res) {
    //TODO: not projectList, itemList, use projId Param, add items to mongo
    await init();
    const projectId = req.params.projId;
    const items = await Item.find({ projectId }).exec();
    //console.log(items);
    res.json(items);
}

exports.addProject = async function (req, res) {
    await init();
    const projectName = req.body.projName;
    const project = new Project({
        title: projectName
    });
    project.save();
    res.status(201); // Created
    res.json(project);
}

exports.deleteProject = async function (req, res) {
    await init();
    const projectId = req.params.projId;
    const project = await Project.deleteOne({ _id: projectId }).exec();
    res.json(project);
}

exports.updateProject = async function (req, res) {
    await init();
    const projectId = req.params.projId;
    const project = await Project.findById(projectId).exec();
    project.title = req.body.title;
    await project.save();
    res.json(project);
}

//export {projectList}