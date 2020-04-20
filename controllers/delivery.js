const Delivery = require('../models/Delivery')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function (req, res) {
    /*const query = {
        user: req.user.id
    }

    //дата старта
    if (req.query.start) {
        query.date = {
            //больше или равно
            $gte: req.query.start
        }
    }

    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }

        query.date['$lte'] = req.query.end
    }

    if (req.query.order) {
        query.order = +req.query.order
    }*/

    try {
        const deliveries = await Order
            .find({})
            .sort({
                date: -1
            })

        res.status(200).json(deliveries)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const newdelivery = await Delivery.findOne({ train: req.body.train, waybill: req.body.waybill })

    if (newdelivery) {
        // Категория существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Поставка существует. Проверьте вводимые данные.'
        })
    } else {
        try {
            const delivery = await new Delivery({
                shopBuyer: req.body.shopBuyer,
                shop: req.body.shop,
                train: req.body.train,
                order: req.body.order,
                orderId: req.body.orderId,
                waybill: req.body.waybill,
                list: req.body.list,
                imageSrc: req.file ? req.file.path : '',
                user: req.user.id,

            }).save()
            res.status(201).json(delivery)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.update = async function (req, res) {
    const updelivery = await Delivery.findOne({ _id: req.params.id })
    if (updelivery.user == req.user.id) {
        try {
            const delivery = await Delivery.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            )
            res.status(200).json(delivery)
        } catch (e) {
            errorHandler(res, e)
        }
    } else {
        res.status(409).json({
            message: 'У Вас нет прав на редактирование этой записи.'
        })
    }
}