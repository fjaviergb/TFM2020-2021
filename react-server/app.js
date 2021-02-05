const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');
const dbConfig = require('./db-config.js')
const MODEL = require('./models.js');
var crypto = require("crypto");

const app = express();
const pool = mysql.createPool(dbConfig);

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.post(MODEL.LOGIN.ROUTE, (req, res) => {
    pool.query(MODEL.LOGIN.SQL(req.body), (err, result) => {
        if (err) {
            res.json({ message: "Unknown error" });
        } else if (result.length > 0) {
            res.json({ idcl: result[0].idcl, name: result[0].name, token: crypto.randomBytes(20).toString('hex')});
        } else {res.json({ message: "User/password incorrect" });}
    });
});

app.post(MODEL.REGISTER.ROUTE, (req, res) => {
  pool.query(MODEL.REGISTER.SQL, MODEL.REGISTER.SQL_DATA(req.body), (err, result) => {
      if (err) {
        console.log(err)
        res.json({ message: `Unknown error ${err.sqlMessage}` });
      } else if (result) {
        res.json({ idcl: result.insertId, name: req.body.name, token: crypto.randomBytes(20).toString('hex')});
      } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.GETADDRESSES.ROUTE, (req,res) => {
  pool.query(MODEL.GETADDRESSES.SQL(req.body.idcl), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.GETTAGS.ROUTE, (req,res) => {
  pool.query(MODEL.GETTAGS.SQL(req.body.idcl), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

//////////
// FALTAN KEYS
//////////

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});