const express = require('express');

const app = express();
app.set('port', process.env.PORT || 5500);

app.use(express.static('.'));

const server = app.listen(app.get('port'), () => {
    console.log('Starting server on...', app.get('port'));
});

app.get('/profile', (req,res) => res.send('Hola Mundo'));



