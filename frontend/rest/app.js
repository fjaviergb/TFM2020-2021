const { urlencoded } = require('express');
const express = require('express');
const morgan = require('morgan');
const app = express();

//middlewares
app.set('port', process.env.PORT || 5500);
app.set('json spaces', 2)
app.use(morgan('dev'));
app.use(urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('.'));

//routes
app.use('/profile',require('./routes/main.js'))

//listening
app.listen(app.get('port'), () => {
    console.log('Starting server on...', app.get('port'));
});




