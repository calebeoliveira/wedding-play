const script = require('./public/audio/script.json');
const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

//noinspection JSUnresolvedFunction
app.get('/', (req, res) => {
    res.render('index', {script});
});

app.listen(8000, () => {
    console.info('Listening for connections on port 8000.');
});