const express = require('express')
const passport = require('passport')
const controller = require('../controllers/delivery')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {
    session: false
}), controller.getAll)

router.post('/', passport.authenticate('jwt', {
    session: false
}), controller.create)

router.patch('/:id', passport.authenticate('jwt', {
    session: false
}), controller.update)

module.exports = router