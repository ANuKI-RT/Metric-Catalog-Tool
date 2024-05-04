var controllers = require('./controllers');

var projectControllers = require('./controllers/projects.js')

var itemControllers = require('./controllers/items.js')

var modifiedItemControllers = require('./controllers/modifiedItems.js')

module.exports = function (router) {
    router.get('/', controllers.index);
    router.get('/setLocale/:locale', controllers.setLocale);
    router.get('/api/projects', projectControllers.projectList)
    router.get('/api/modifiedItems/:projId', modifiedItemControllers.itemList)
    router.post('/api/projects', projectControllers.addProject)
    router.delete('/api/projects/:projId', projectControllers.deleteProject)
    router.put('/api/projects/:projId', projectControllers.updateProject)
    router.get('/api/items', itemControllers.itemList)
    router.post('/api/items', itemControllers.addItem)
    router.delete('/api/items/:itemId', itemControllers.deleteItem)
    router.put('/api/items/:itemId', itemControllers.updateItem)
    router.delete('/api/modifiedItems/:itemId', modifiedItemControllers.deleteItem)
    router.put('/api/modifiedItems/:itemId', modifiedItemControllers.updateItem)
    router.post('/api/modifiedItems', modifiedItemControllers.addItem)
    router.get('/api/searchItems/:searchString', itemControllers.searchItems)
    router.get('/api/searchItems/:projId/:searchString', itemControllers.searchItems);
};