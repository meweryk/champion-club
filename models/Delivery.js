const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliverySchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    shopBuyer: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true
    },
    orderId: {
        ref: 'orders',
        type: Schema.Types.ObjectId
    },
    order: {
        type: Number
    },
    train: {
        type: String,
        required: true
    },
    waybill: {
        type: String,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            rank: {
                type: String
            },

            cost: {
                type: Number
            },
        }
    ],
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('deliveries', deliverySchema)