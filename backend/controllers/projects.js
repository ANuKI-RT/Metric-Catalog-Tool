const { default: mongoose } = require('mongoose');
var { init, Project } = require('../db');

exports.projectList = async function (req, res) {
    await init();
    const projects = await Project.find({});
    res.json(projects);
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