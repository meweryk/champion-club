const fs = require('fs')
const errorHandler = require('../utils/errorHandler')
const keys = require('../config/keys')
const mongoose = require('mongoose')

const conn = mongoose.connection

let gridFSBucket
conn.once('open', function () {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db)
    console.log('all set');
})

module.exports.addPicture = function (req, res, next) {
    const options = {
        contentType: req.file.mimetype,
        aliases: req.body.albumId
    }
    const writestream = gridFSBucket.openUploadStream(req.file.filename, options)
    fs.createReadStream(req.file.path).pipe(writestream)
        .on('error', function (error) {
            assert.ifError(error);
        })
        .on('finish', function () {
            console.log(`Файл ${req.file.filename} загружен в базу`)
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log('Cleanup Error:', err)
                    return errorHandler(res, err)
                }
                console.log('Файл удалён из локального хранилища.')
            })
            return res.status(200).json({ message: `Файл загружен.` })
        })
}

module.exports.getPicture = async function (req, res, next) {
    if (!gridFSBucket) {
        console.log("some error occured, check connection to db")
        res.send("some error occured, check connection to db")
    }

    const readstream = gridFSBucket.openDownloadStreamByName(req.params.filename)
    readstream.pipe(res)
        .on('error', function (error) {
            assert.ifError(error);
        })
        .on('finish', function () {
            console.log('done!');
        })

}

module.exports.getIds = async function (req, res) {
    try {
        const pictures = await gridFSBucket.find({ aliases: req.params.albumId }).toArray()
        res.status(200).json(pictures)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await gridFSBucket.delete(new mongoose.Types.ObjectId(req.params.id))
        res.status(200).json({ message: `Файл удалён.` })
    } catch (e) {
        errorHandler(res, e)
    }
}