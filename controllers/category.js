const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({ user: req.user.id })
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
    const category = await Category.findOne({ _id: req.params.id })
    const elseShop = await Position.findOne({ category: req.params.id, shop: { $ne: req.user.shop } }, { shop: 1 })

    if ((category.user == req.user.id) && !elseShop) {
        //если категория создана пльзователем и уё не используют позиций с других складов-магазинов
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
            message: 'Категория уже существует. Войдите и добавьте позиции.'
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
        const updated = {
            name: req.body.name
        }
        if (req.file) {
            updated.imageSrc = req.file.path
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