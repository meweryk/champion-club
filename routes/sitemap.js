var express = require('express')
var router = express.Router()
var fs = require('fs')

/* GET sitemap */
router.get('/sitemap.xml', function (req, res) {
    res.header('Content-Type', 'application/xml');
    res.send(
        fs.readFileSync(
            require('path').resolve(
                __dirname, '../uploads/sitemap.xml'), "utf8"));
})

module.exports = router