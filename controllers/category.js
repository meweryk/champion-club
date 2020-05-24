const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({
            //user: req.user.id 
        })
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    //удаление файлов, если они есть
    const thisShop = await Position.find({ category: req.params.id, shop: req.user.shop })
    if (thisShop) {
        for (let position of thisShop) {
            if (position.imageSrc) {
                try {
                    await unlinkAsync(position.imageSrc)//удаление фото//удаление фото позиций
                } catch (e) {
                    errorHandler(res, e)
                }
            }
        }
    }
    const category = await Category.findOne({ _id: req.params.id })
    const elseShop = await Position.findOne({ category: req.params.id, shop: { $ne: req.user.shop } }, { shop: 1 })
    //проверяем права пользователя на категорию и присутствие других магазинов
    if ((category.user == req.user.id) && !elseShop) {
        //если категория создана пльзователем и её не используют позиций с других складов-магазинов
        if (category.imageSrc) {
            try {
                await unlinkAsync(category.imageSrc)//удаление фото
            } catch (e) {
                console.log(res, e)
            }
        }
        try {
            await Category.remove({
                _id: req.params.id
            })
            await Position.remove({
                category: req.params.id,
                shop: req.user.shop
            })
            res.status(200).json({
                message: 'Категория удалена'
            })
        } catch (e) {
            errorHandler(res, e)
        }

    } else {
        try {
            await Position.remove({
                category: req.params.id,
                shop: req.user.shop
            })
            res.status(200).json({
                message: 'Категория используется глобально. Ваши позиции удалены.'
            })
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.create = async function (req, res) {
    const newcategory = await Category.findOne({ name: req.body.name })
    if (newcategory) {
        // Категория существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Категория уже существует. Войдите и добавьте  свои позиции.'
        })
    } else {
        //создаём новую категорию
        const category = new Category({
            name: req.body.name,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : ''
        })
        try {
            await category.save()
            res.status(201).json(category)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.update = async function (req, res) {
    const upcategory = await Category.findOne({ _id: req.params.id })
    if (upcategory.user == req.user.id) {
        const updated = { name: req.body.name }
        if (req.file) {
            updated.imageSrc = req.file.path
            if (upcategory.imageSrc) {
                try {
                    await unlinkAsync(upcategory.imageSrc)//удаление фото
                    console.log('Old foto del.')
                } catch (e) {
                    console.log(res, e)
                }
            }
        }
        try {
            const category = await Category.findOneAndUpdate(
                { _id: req.params.id },
                { $set: updated },
                { new: true }
            )
            res.status(200).json(category)
        } catch (e) {
            errorHandler(res, e)
        }

    } else {
        res.status(409).json({
            message: 'У Вас нет прав на редактирование этой категории.'
        })
    }
}