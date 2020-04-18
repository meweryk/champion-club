const Position = require('../models/Position')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

module.exports.getByCategoryIdAllShop = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId
        })
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            //shop: req.user.shop
        })
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            stock: req.body.stock,
            rank: req.body.rank,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id,
            shop: req.user.shop,
            nicname: req.user.name,
            exposition: req.body.exposition,
            imageSrc: req.file ? req.file.path : ''
        }).save()
        res.status(201).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    const position = await Position.findById(req.params.id)
    if (position.imageSrc) {
        try {
            await unlinkAsync(position.imageSrc) //удаление фото            
        } catch (e) {
            console.log(res, e)
        }
    }
    try {
        await Position.remove({ _id: req.params.id })
        res.status(200).json({
            message: 'Позиция была удалена.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const upposition = await Position.findOne({ _id: req.params.id })
    if (upposition.user == req.user.id) {
        const updated = {
            name: req.body.name,
            stock: req.body.stock,
            rank: req.body.rank,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id,
            shop: req.user.shop,
            nicname: req.user.name,
            exposition: req.body.exposition
        }

        if (req.file) {
            updated.imageSrc = req.file.path
            if (upposition.imageSrc) {
                try {
                    await unlinkAsync(upposition.imageSrc)//удаление старого фото
                } catch (e) {
                    console.log(res, e)
                }
            }
        }

        try {
            const position = await Position.findOneAndUpdate(
                { _id: req.params.id },
                { $set: updated },
                { new: true }
            )
            res.status(200).json(position)
        } catch (e) {
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: 'У Вас нет прав на редактирование этой позиции.'
        })
    }

}