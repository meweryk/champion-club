const Album = require('../models/Album')
const errorHandler = require('../utils/errorHandler')

const mongoose = require('mongoose')

const conn = mongoose.connection

let gridFSBucket
conn.once('open', function () {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db)
    console.log('album set');
})

module.exports.add = async function (req, res) {
    const newAlbum = await Album.findOne({ name: req.body.name })
    if (newAlbum) {
        // Альбом существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Альбом уже существует. Войдите и добавьте фото.'
        })
    } else {
        const album = new Album({
            name: req.body.name,
            description: req.body.description,
            user: req.user.id
        })

        try {
            await album.save()
            res.status(201).json(album)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

//Обновить фотоальбом на основе идентификатора альбома
module.exports.edit = (req, res, next) => {
    const upAlbum = Album.findOne({ _id: req.params.id })
    if (upAlbum.user == req.user.id) {
        Album.get(req.params.id, (err, album) => {
            if (err || !album) {
                return res.json({ success: false, error: err });
            }

            if (req.body.name) {
                album.name = req.body.name;
            }
            if (req.body.description) {
                album.description = req.body.description;
            }

            Album.edit(album, (err, data) => {
                if (err) {
                    return res.json({ success: false, error: err });
                }
                res.json({ success: true, album: data });
            });
        })
    } else {
        res.status(409).json({
            message: 'У Вас нет прав на редактирование этого альбома.'
        })
    }
}

module.exports.remove = async function (req, res) {
    const album = await Album.findOne({ _id: req.params.id })
    if (album.user == req.user.id) {
        const pictures = await gridFSBucket.find({ aliases: req.params.id }).toArray()
        // Сначала удалите все фотографии в альбоме
        if (pictures) {
            for (let picture of pictures) {
                try {
                    await gridFSBucket.delete(new mongoose.Types.ObjectId(picture._id))//удаление фото
                } catch (e) {
                    errorHandler(res, e)
                }
            }
        }

        // Second, remove the album itself.
        try {
            await Album.deleteOne({
                _id: req.params.id
            })
            res.status(200).json({
                message: 'Категория удалена'
            })
        } catch (e) {
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: 'У Вас нет прав на удаление альбома.'
        })
    }
}

module.exports.getAll = async function (req, res) {
    try {
        const albums = await Album.find()
        res.status(200).json(albums)
    } catch (e) {
        errorHandler(res, e)
    }
}
