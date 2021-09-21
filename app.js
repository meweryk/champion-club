const compression = require('compression')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')
const orderRoutes = require('./routes/order')
const deliveryRoutes = require('./routes/delivery')
const albumsRoutes = require('./routes/albums')
const picturesRoutes = require('./routes/pictures')

const keys = require('./config/keys')
const app = express()

mongoose.Promise = global.Promise
// connection
mongoose.connect(keys.mongoURI, {})
    .then(() => {
        console.log('MongoDB connected.')
    })
    .catch(error => console.log(error))

app.use(compression())

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))

//set static file location
app.use('/uploads', express.static('uploads',
    {
        etag: true, // Just being explicit about the default.
        lastModified: true,  // Just being explicit about the default.
        setHeaders: (res, path) => {
            if (path.endsWith('.html')) {
                // All of the project's HTML files end in .html
                res.setHeader('Cache-Control', 'no-cache');
            }
        },
    }
))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/delivery', deliveryRoutes)
app.use('/api/albums', albumsRoutes)
app.use('/api/pictures', picturesRoutes)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client',
        {
            etag: true, // Just being explicit about the default.
            lastModified: true,  // Just being explicit about the default.
            setHeaders: (res, path) => {
                if (path.endsWith('.html')) {
                    // All of the project's HTML files end in .html
                    res.setHeader('Cache-Control', 'no-cache');
                }
            },
        }
    ))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}

module.exports = app