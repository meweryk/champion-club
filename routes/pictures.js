const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../middleware/upload')

const controller = require('../controllers/pictures')

// Writing a file from local to MongoDB
router.post('/write', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.addPicture)

// Reading a _id file of Album from MongoDB
router.get('/album/:albumId', controller.getIds)

// Reading a file from MongoDB
router.get('/:filename', controller.getPicture)

//Remove a file from MongoDB
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)


module.exports = router