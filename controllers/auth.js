const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 * 24 })
            const nicname = candidate.name
            const shop = candidate.shop
            const email = candidate.email
            const phone = candidate.phone

            res.status(200).json({
                token: `Bearer ${token}`,
                nicname: nicname,
                shop: shop,
                email: email,
                phone: phone
            })
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают. попробуйте снова.'
            })
        }
    } else (
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    )

}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        res.status(409).json({
            message: 'Такой Email уже занят. попробуйте другой.'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            name: req.body.nicname,
            shop: req.body.shop ? req.body.shop : req.body.nicname,
            phone: req.body.phone
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}