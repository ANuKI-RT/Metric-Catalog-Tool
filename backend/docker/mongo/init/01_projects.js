db = db.getSiblingDB('projects');

db.createCollection('projects');

db.projects.insertMany([
    {
        id: 1234,
        title: 'Projekt1'
    },
    {
        id: 2345,
        title: 'Projekt2'
    },
    {
        id: 3456,
        title: 'Projekt3'
    }
]);