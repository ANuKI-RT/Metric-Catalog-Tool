var controllers = require('./controllers');

var projectControllers = require('./controllers/projects.js')

module.exports = function (router) {
    router.get('/', controllers.index);
    router.get('/setLocale/:locale', controllers.setLocale);
    router.get('/api/projects', projectControllers.projectList)
    router.get('/api/project/:projId/items', projectControllers.itemList)
    router.get('/api/project/createDocs', projectControllers.createDocs)
};