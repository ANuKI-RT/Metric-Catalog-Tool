db = db.getSiblingDB('projects');
db.createUser(
    {
        user: "projects",
        pwd: "projects",
        roles: [
            {
                role: "readWrite",
                db: "projects"
            }
        ]
    }
);