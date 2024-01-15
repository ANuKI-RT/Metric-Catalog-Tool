var {init, Project} = require('../db');

exports.projectList = function (req, res) {
    res.json([
        {
            id: 1234,
            title: 'title'
        },
        {
            id:2345,
            title: 'was anderes'
        }
    ]);
}

exports.itemList = async function (req, res) {
    await init();
    const projects = await Project.find({}, "id title");
    res.json(projects);
}

exports.createDocs = async function (req, res) {
    await init();
    const p = new Project({
        id:2345,
        title: 'was anderes'
    });
    await p.save();
    res.json({
        'create': 'ok'
    });
}

//export {projectList}