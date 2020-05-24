const Album = require('../models/Album')
const errorHandler = require('../utils/errorHandler')

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
        // Сначала удалите все фотографии в альбоме
        /*Picture.getIds(albumId, (err, pictures) => {
            if (err) {
                return res.json({ success: false, error: err });
            }
            for (let i = 0; i < pictures.length; i++) {
                Picture.deleteById(pictures[i]._id, (err) => {
                    if (err) {
                        return res.json({ success: false, error: err });
                    }
                });
            }*/

        // Second, remove the album itself.
        try {
            await Album.remove({
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

//получить альбом с фото из базы 
/*module.exports.get = (req, res, next) => {
    Album.get(req.params.id, (err, data) => {
        if (err) {
            return res.json({ success: false, error: err });
        }
        Picture.getIds(data._id, (err, pictures) => {
            if (err) {
                return res.json({ success: false, error: err });
            }
            // Добавить идентификаторы фотографий к возвращенным данным из Монго
            // Вот почему мы используем Lean в нашем запросе
            data.pictures = [];
            if (pictures) {
                for (let i = 0; i < pictures.length; i++) {
                    data.pictures.push(pictures[i]._id);
                }
            }
            return res.json({ success: true, album: data });
        });
    })
}*/

module.exports.getAll = async function (req, res) {
    try {
        const albums = await Album.find()
        res.status(200).json(albums)
    } catch (e) {
        errorHandler(res, e)
    }
}
