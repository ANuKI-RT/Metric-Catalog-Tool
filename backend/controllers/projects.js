const { default: mongoose } = require('mongoose');
const { Project } = require('../db');

/**
 * get all projects from database
 * @param {*} req 
 * @param {*} res 
 */
exports.projectList = function (req, res) {
    Project
        .find({})
        .then(data => res.json(data));
}

/**
 * add project to database
 * @param {*} req 
 * @param {*} res 
 */
exports.addProject = async function (req, res) {
    const projectName = req.body.projName;
    const project = new Project({
        title: projectName
    });
    project.save();
    res.status(201); // Created
    res.json(project);
}

/**
 * delete project from database
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProject = async function (req, res) {
    const projectId = req.params.projId;
    const project = await Project.deleteOne({ _id: projectId }).exec();
    res.json(project);
}

/**
 * update project in database
 * @param {*} req 
 * @param {*} res 
 */
exports.updateProject = async function (req, res) {
    const projectId = req.params.projId;
    const project = await Project.findById(projectId).exec();
    project.title = req.body.title;
    await project.save();
    res.json(project);
}