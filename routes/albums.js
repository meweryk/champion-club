const express = require('express')
const controller = require('../controllers/album')
const passport = require('passport')
const router = express.Router()

router.get('/', controller.getAll)
//router.get('/:id', controller.get)
router.post('/', passport.authenticate('jwt', { session: false }), controller.add)
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.edit)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove)

module.exports = router