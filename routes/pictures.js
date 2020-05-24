const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../middleware/upload')

const controller = require('../controllers/pictures')

// Writing a file from local to MongoDB
router.post('/write', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.addPicture)

/*router.post('/', passport.authenticate('jwt', { session: false }), upload.single('picture'), (req, res, next) => {
    Picture.add(req.file, req.body.album, (err, file) => {
        if (err) {
            console.log('Error:', err);
            return res.json({ success: false, error: err });
        }
        // Remove picture from disk
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log('Cleanup Error:', err);
                return res.json({ success: false, error: err });
            }
            return res.json({ success: true });
        });
    });
})*/



module.exports = router