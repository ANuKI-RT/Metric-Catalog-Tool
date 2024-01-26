db = db.getSiblingDB('projects');

db.createCollection('items');

var c = db.projects.find( { id: { $eq: 1234 } } )
var p = c.next()

print('Patty')
printjson(c)
printjson(p)

db.items.insertMany([
    {
        id: 1,
        title: 'Item1',
        projectId: p._id
    },
    {
        id: 2,
        title: 'Item2',
        projectId: p._id
    },
    {
        id: 3,
        title: 'Item3',
        projectId: p._id
    }
]);

c = db.projects.find( { id: { $eq: 2345 } } )
p = c.next()

db.items.insertMany([
    {
        id: 1,
        title: 'Item1',
        projectId: p._id
    },
    {
        id: 2,
        title: 'Item2',
        projectId: p._id
    },
    {
        id: 3,
        title: 'Item3',
        projectId: p._id
    }
]);