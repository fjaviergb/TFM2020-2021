// Fetch API o XMLHttpRequest en JS Vanilla
// Express & Nodejs sin Vanilla

const express = require('express')
const app = express()
// Devuelve un objeto de tipo express, que es una aplicacion

app.use(express.json());
// Mandatory para acceder al cuerpo de los http request

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];
// courses simula una 'base de datos'

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify([1,2,3]));
});

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {res.status(404).send('Not found');}
    res.send(course)
})

app.post('/api/courses', (req,res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Escuchando el puerto ${port} ...`);});
