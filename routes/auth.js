const express = require('express')
const passport = require('passport')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)

module.exports = router