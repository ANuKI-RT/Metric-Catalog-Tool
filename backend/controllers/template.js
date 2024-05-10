const multer = require('multer');

const mongoose = require('mongoose');
const GridFs = require('gridfs-stream');
const fs = require('fs');
const bodyParser = require('body-parser');
const { init, ConfigurationFile } = require('../db');
const { file } = require('grunt');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


const { GridFSBucket } = require('mongodb');
let bucket;

const conn = mongoose.connection;
conn.once('open', () => {
    bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

exports.getConfigurationFile = async function (req, res) {
    // await init();
    try {
        const projectId = mongoose.Types.ObjectId(req.params.projId);
        console.log('Projekt-ID: ', projectId);
        const configFile = await ConfigurationFile.findOne({ projectId: projectId });
        if (!configFile) {
            return res.status(404).json({ message: 'Datei nicht gefunden 1' });
        }

        const downloadStream = bucket.openDownloadStream(configFile.fileId);

        downloadStream.on('data', (chunk) => {
            console.log('Chunk data: ', chunk);
        });

        downloadStream.on('error', () => {
            return res.status(404).json({ message: 'Chunk nicht gefunden' });
        });

        downloadStream.on('end', () => {
            console.log('Datei heruntergeladen');
        });

        res.set('Content-Type', 'text/csv');
        res.set('Content-Disposition', 'attachment; filename="' + configFile.filename + '"');
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Fehler beim Abrufen der Datei: ', error);
        res.status(500).json({ message: 'Ein Fehler ist aufgetreten: ' + error.message });
    }
}