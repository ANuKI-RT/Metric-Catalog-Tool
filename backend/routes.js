var controllers = require('./controllers');

var projectControllers = require('./controllers/projects.js')

module.exports = function (router) {
    router.get('/', controllers.index);
    router.get('/setLocale/:locale', controllers.setLocale);
    router.get('/api/projects', projectControllers.projectList)
    router.get('/api/project/:projId/items', projectControllers.itemList)
    router.post('/api/projects', projectControllers.addProject)
    router.delete('/api/projects/:projId', projectControllers.deleteProject)
    router.put('/api/projects/:projId', projectControllers.updateProject)
};