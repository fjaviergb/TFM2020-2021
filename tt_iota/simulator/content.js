const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors({credentials: true, origin: 'http://127.0.0.1:5500'}));
app.use(express.json());

app.post('', (req, res) => {
    console.log(req.body.address);
    res.send('Hello World')
});

app.listen(5500, () => {console.log(`Escuchando el puerto 5500...`);});


