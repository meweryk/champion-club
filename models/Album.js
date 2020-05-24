const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
})

module.exports = mongoose.model('album', albumSchema)
