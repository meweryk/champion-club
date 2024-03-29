const express = require('express')
const passport = require('passport')
const controller = require('../controllers/delivery')
const upload = require('../middleware/upload')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {
    session: false
}), controller.getAll)

router.post('/', passport.authenticate('jwt', {
    session: false
}), upload.single('image'), controller.create)

router.patch('/:id', passport.authenticate('jwt', {
    session: false
}), upload.single('image'), controller.update)

module.exports = router