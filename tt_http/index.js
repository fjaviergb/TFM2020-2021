// Fetch API o XMLHttpRequest en JS Vanilla
// Express & Nodejs sin Vanilla

const Joi = require('joi');
const express = require('express');
const app = express();
// Devuelve un objeto de tipo express, que es una aplicacion

app.use(express.json());
// Mandatory para acceder al cuerpo de los http request

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];
// courses simula una 'base de datos'

function validateCourse(req) {
    const schema = Joi.object({
        name: Joi.string().min(3),
    });

    return schema.validate(req);
};


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify(courses));
});

// app.get('/api/courses/:year/:month', (req, res) => {
//     res.send(req.query);
// });
//
// Esto era un ejemplo

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course) return res.status(404).send('Not found');

    res.send(course)
});

app.post('/api/courses', (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
    });

    const { error } = validateCourse(req.body);
    // result.error se podría sustituir por { error } = validateCourse(req.body);
    // Es un método de desestructuración de js
    // De esta manera no se necesita llamar a result.error si no a error

    if (error) return res.status(400).send(error.details[0].message);
        
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('Not found');
        
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
        
    
    course.name = req.body.name;
    res.send(course)
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Not found');

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Escuchando el puerto ${port} ...`);});
