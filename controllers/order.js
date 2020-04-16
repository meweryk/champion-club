const moment = require('moment-timezone')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

const zone = "Europe/Zaporozhye"

//localhost:5000/api/order?offset=2&limit=5
module.exports.getAll = async function (req, res) {
  const query = {}

  if (req.user.shop) {
    query.$or = [
      { shopBuyer: req.user.shop },
      {
        list: {
          $elemMatch: {
            shopSeller: req.user.shop
          }
        }
      }
    ]
  } else {
    query.user = req.user.id
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
  }

  try {
    const orders = await Order
      .find(query)
      .sort({ date: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit)
    res.status(200).json(orders)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  const userfirstSeller = req.body.list[0]['userSeller']

  try {
    const lastOrder = await Order
      .findOne({ user: userfirstSeller })
      .sort({ date: -1 })
    const maxOrder = lastOrder ? lastOrder.order : 0
    const order = await new Order({
      list: req.body.list,
      userfirstSeller: userfirstSeller,
      shopBuyer: req.body.shopBuyer ? req.body.shopBuyer : 'Гость',
      nicname: req.body.nicname ? req.body.nicname : 'Гость',
      user: req.body.idBuyer ? req.body.idBuyer : '5e985d2c86190a217425cda7',
      order: maxOrder + 1
    }).save()

    res.status(201).json(order)
  } catch (e) {
    errorHandler(res, e)
  }

}