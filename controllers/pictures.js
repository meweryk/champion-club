const fs = require('fs')
const errorHandler = require('../utils/errorHandler')
const keys = require('../config/keys')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
Grid.mongo = mongoose.mongo;
const conn = mongoose.createConnection(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs
conn.once('open', function () {
    gfs = Grid(conn.db);
    console.log('all set');
})

module.exports.addPicture = function (req, res, next) {
    const writestream = gfs.createWriteStream({ filename: req.file.filename, contentType: req.file.mimetype, aliases: req.body.albumId });
    fs.createReadStream(req.file.path).pipe(writestream);
    writestream.on('close', function (file) {
        console.log(`Файл ${file.filename} загружен в базу`)
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log('Cleanup Error:', err)
                return errorHandler(res, err)
            }
            console.log('Файл удалён из локального хранилища.')
        })
        return res.status(200).json({ message: `Файл загружен.` })
    });
}
