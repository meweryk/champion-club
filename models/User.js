const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: ''
    },
    postname: {
        type: String,
        default: ''
    },
    shop: {
        type: String
    },
    phone: {
        type: String
    }
})

module.exports = mongoose.model('users', userSchema)