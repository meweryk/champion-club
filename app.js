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

// connection
mongoose.connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('MongoDB connected.')
    })
    .catch(error => console.log(error))
/*mongoose.Promise = global.Promise
gridfs.mongo = mongoose.mongo;
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Connected to database ...');
    const gfs = gridfs(connection.db)
})
// Writing a file from local to MongoDB
app.use('/api/write', upload.single('image'), function (req, res) {
    var writestream = gfs.createWriteStream({ filename: req.file.filename, contentType: req.file.mimetype, aliases: req.body.albumId });
    fs.createReadStream(req.file.path).pipe(writestream);
    writestream.on('close', function (file) {
        res.status(200).json({ message: 'Файл создан : ' + file.filename });
        try {
            fs.unlink(req.file.path)
            res.json({ message: 'Файл удалён.' })
        } catch (e) {
            errorHandler(res, e)

        }
    });

});

// Reading a file from MongoDB
app.get('/read', function (req, res) {
    // Check file exist on MongoDB
    gfs.exist({ filename: db_filename }, function (err, file) {
        if (err || !file) {
            res.send('File Not Found');
        } else {
            var readstream = gfs.createReadStream({ filename: db_filename });
            readstream.pipe(res);
        }
    });
});

// Delete a file from MongoDB
app.get('/delete', function (req, res) {
    gfs.exist({ filename: db_filename }, function (err, file) {
        if (err || !file) {
            res.send('File Not Found');
        } else {
            gfs.remove({ filename: db_filename }, function (err) {
                if (err) res.send(err);
                res.send('File Deleted');
            });
        }
    });
});

// Get file information(File Meta Data) from MongoDB
app.get('/meta', function (req, res) {
    gfs.exist({ filename: db_filename }, function (err, file) {
        if (err || !file) {
            res.send('File Not Found');
        } else {
            gfs.files.find({ filename: db_filename }).toArray(function (err, files) {
                if (err) res.send(err);
                res.send(files);
            });
        }
    });
})*/


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