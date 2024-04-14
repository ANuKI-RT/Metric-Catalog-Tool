const multer = require('multer');

const mongoose = require('mongoose');
const GridFs = require('gridfs-stream');
const fs = require('fs');
const bodyParser = require('body-parser');
const { init, ConfigurationFile } = require('../db');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

let gfs;
mongoose.connection.once('open', () => {
    gfs = GridFs(mongoose.connection.db, mongoose.mongo);
})


exports.uploadConfigurationFile = async function (req, res, next) {
    console.log('uploadConfigurationFile wurde aufgerufen');
    await init();
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
            await gfs.remove({ _id: oldFile.fileId, root: 'uploads' });
            await oldFile.remove();
        }

        const writeStream = gfs.createWriteStream({
            filename: file.originalname,
            root: 'uploads'
        });

        writeStream.on('error', (error) => {
            console.error('Fehler beim Schreiben der Datei: ', error);
            res.status(500).json({ message: 'Ein Fehler ist aufgetreten: ' + error.message });
        });

        writeStream.on('close', async (uploadedFile) => {
            console.log('Datei wurde erfolgreich hochgeladen');
            const configFile = new ConfigurationFile({
                projectId,
                filename: uploadedFile.filename,
                fileId: uploadedFile._id
            });

            await configFile.save();
            console.log('Konfigurationsdatei wurde gespeichert');

            res.status(201).json(configFile);
        });

        fs.createReadStream(file.path).pipe(writeStream);
    } catch (error) {
        console.error('Fehler beim Hochladen der Datei: ', error);
        res.status(500).json({ message: 'Ein Fehler ist aufgetreten: ' + error.message });
    }


}
exports.getConfigurationFile = async function (req, res) {
    await init();
    try {
        const projectId = req.params.projId;

        const configFile = await ConfigurationFile.findOne({ projectId });
        if (!configFile) {
            return res.status(404).json({ message: 'Datei nicht gefunden' });
        }

        const file = await gfs.files.findOne({ _id: configFile.fileId });
        if (!file) {
            return res.status(404).json({ message: 'Datei nicht gefunden' });
        }

        const readStream = gfs.createReadStream({ _id: configFile.fileId });
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
        readStream.pipe(res);
    } catch (error) {
        console.error('Fehler beim Abrufen der Datei: ', error);
        res.status(500).json({ message: 'Ein Fehler ist aufgetreten: ' + error.message });
    }
}



