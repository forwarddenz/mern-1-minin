const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/link', require('./routes/link.route'))
app.use('/t', require('./routes/redirect.route'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PROT = config.get('port') || 5000;

async function start() {
    try {

        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PROT, () => console.log('Start'))

    } catch (err) {
        console.log('Server Error', err.message)
        process.exit(1)
    }
}

start()