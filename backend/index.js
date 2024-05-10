'use strict';

require('dotenv').config();

const kraken = require('kraken-js'),
    express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    GridFsStorage = require('multer-gridfs-storage').GridFsStorage,
    fs = require('fs'),
    { init, ConfigurationFile } = require('./db'),
    app = express(),
    options = {
        onconfig: function (config, next) {
            next(null, config);
        }
    },
    port = process.env.PORT || 8000;

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI || 'mongodb+srv://projects:projects@projects.kk3cqwe.mongodb.net/projects',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = Date.now() + '-' + file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage: storage });

app.use(kraken(options));

app.post('/api/configurationfiles', upload.any(), async function (req, res, next) {
    console.log('uploadConfigurationFile wurde aufgerufen');
    // await init();
    try {
        const file = req.files.find(f => f.fieldname === 'file');
        const projectId = req.body.projectId;

        if (!file || !projectId) {
            console.log(file, projectId)
            console.log('Datei oder Projekt-ID fehlt');
            return res.status(400).json({ message: 'Datei und Projekt-ID sind erforderlich' });
        }

        console.log(`Datei: ${file.originalname}, Projekt-ID: ${projectId}`);

        const oldFile = await ConfigurationFile.findOne({ projectId });
        if (oldFile) {
            console.log('Alte Datei gefunden, wird entfernt');
            await oldFile.remove();
        }

        const configFile = new ConfigurationFile({
            projectId,
            filename: file.originalname,
            fileId: file.id
        });

        await configFile.save();
        console.log('Konfigurationsdatei wurde gespeichert');

        res.status(201).json(configFile);
    } catch (error) {
        console.error('Fehler beim Hochladen der Datei: ', error);
        res.status(500).json({ message: 'Ein Fehler ist aufgetreten: ' + error.message });
    }
});

app.listen(port, async function (err) {
    await init();
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});