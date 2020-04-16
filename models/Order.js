const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            exposition: {
                type: String
            },
            imageSrc: {
                type: String,
                default: ''
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            },
            shopSeller: {
                type: String
            },
            userSeller: {
                ref: 'users',
                type: Schema.Types.ObjectId
            }
        }
    ],
    comment: {
        type: String
    },
    userfirstSeller: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    shopBuyer: {
        type: String
    },
    nicname: {
        type: String
    },
    view: {
        type: Date
    },
    send: {
        type: Date
    },
    got: {
        type: Date
    }
})

module.exports = mongoose.model('orders', orderSchema)