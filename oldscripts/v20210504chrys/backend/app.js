const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');
const MODEL = require('./models.js');
var crypto = require("crypto");
const iv = Buffer.alloc(16, 0); // Initialization vector.
const password = 'ETSII';
const algorithm = 'aes-192-cbc';
const fs = require('fs')
const app = express();


var path = require('path')
var config = fs.readFileSync(`${path.resolve(process.cwd(), '..')}/config.txt`, 'utf8')
config = JSON.parse(config)
const configdb = {
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
}

function handleDisconnect() {
  con = mysql.createConnection(configdb);
  con.connect((err,res) => {
    if (err){
      console.log('Connection to mysql err');
      setTimeout(handleDisconnect,10000);
    } else {console.log(res)}
  });
  con.on('error', (err) => {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {throw err}
  })
}

handleDisconnect();

const HOSTS = require('./cors.js');

var corsOptions = {
  origin: `${HOSTS.backend}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.post(MODEL.LOGIN.ROUTE, (req, res) => {
  crypto.scrypt(password, 'ETSII', 24, (err, key) => {
    if (err) { console.log(err) }
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(req.body.passwd, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    con.query(MODEL.LOGIN.SQL({body: req.body, pswd: encrypted}), (err, result) => {
        if (err) {
            res.status(404).json({ message: "Known error" });
        } else if (result.length > 0) {
            res.json({ type: true, idcl: result[0].idcl, name: result[0].name, token: crypto.randomBytes(20).toString('hex')});
        } else {res.status(404).json({ type: false, message: "User/password incorrect" });}
    });
  });
});

app.post(MODEL.REGISTER.ROUTE, (req, res) => {
  crypto.scrypt(password, 'ETSII', 24, (err, key) => {
    if (err) { console.log(err) }
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(req.body.password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    con.query(MODEL.REGISTER.SQL, MODEL.REGISTER.SQL_DATA({body: req.body, pswd: encrypted}), (err, result) => {
        if (err) {
          console.log(err)
          res.status(404).json({ type: false, message: `Known error ${err.sqlMessage}` });
        } else if (result) {
          res.json({ type: true, idcl: result.insertId, name: req.body.name, token: crypto.randomBytes(20).toString('hex')});
        } else {res.status(404).json({ type: false, message: "Unknown error; try again" });}
    });
  });
});

app.post(MODEL.GETIDENTIFIERS.ROUTE, (req,res) => {
  con.query(MODEL.GETIDENTIFIERS.SQL(req.body.idcl), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.GETPUBLICKEYS.ROUTE, (req,res) => {
  con.query(MODEL.GETPUBLICKEYS.SQL(req.body.idcl), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.CHANGEIDENT.ROUTE, (req, res) => {
  con.query(MODEL.CHANGEIDENT.SQL, MODEL.CHANGEIDENT.SQL_DATA(req.body), (err, result) => {
      if (err) {
        console.log(err)
        res.status(404).json({ message: `Known error ${err.sqlMessage}` });
      } else if (result) {
        res.json({ idcl: req.body.idcl, alias: req.body.alias, idid:req.body.idid, idname:result.insertId});
      } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.CHANGEPKEY.ROUTE, (req, res) => {
  con.query(MODEL.CHANGEPKEY.SQL, MODEL.CHANGEPKEY.SQL_DATA(req.body), (err, result) => {
      if (err) {
        console.log(err)
        res.status(404).json({ message: `Known error ${err.sqlMessage}` });
      } else if (result) {
        res.json({ idcl: req.body.idcl, alias: req.body.alias, idke: req.body.idke, idname:result.insertId});
      } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.NEWIDENT.ROUTE, (req, res) => {
  con.query(MODEL.NEWIDENT.SQL_CHECK(req.body), (err,_result) => {
    if (_result.length === 0) {
      con.query(MODEL.NEWIDENT.SQL, MODEL.NEWIDENT.SQL_DATA(req.body), (err, result) => {
          if (err) {
            console.log(err)
            res.status(404).json({ message: `Known error ${err.sqlMessage}` });
          } else if (result) {
            console.log(result)
            res.json({ idid: result.insertId});
          } else if (err.errno===1062) { console.log(err.data)
            res.status(404).json({ message: err.data });
          } else {res.status(404).json({ message: "Unknown error; try again" });}
      });
    } else {res.json({ idid: _result[0].idid});}
  })
});

app.post(MODEL.NEWPKEY.ROUTE, (req, res) => {
  con.query(MODEL.NEWPKEY.SQL_CHECK(req.body), (err,_result) => {
    if (_result.length === 0) {
      con.query(MODEL.NEWPKEY.SQL, MODEL.NEWPKEY.SQL_DATA(req.body), (err, result) => {
          if (err) {
            console.log(err)
            res.status(404).json({ message: `Known error ${err.sqlMessage}` });
          } else if (result) {
            console.log(result)
            res.json({ idke: result.insertId});
          } else if (err.errno===1062) { console.log(err.data)
            res.status(404).json({ message: err.data });
          } else {res.status(404).json({ message: "Unknown error; try again" });}
      });
    } else {
      res.json({ idke: _result[0].idke});}
  })
});

app.post(MODEL.DELIDENT.ROUTE, (req,res) => {
  con.query(MODEL.DELIDENT.SQL(req.body.idname), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.DELPKEY.ROUTE, (req,res) => {
  con.query(MODEL.DELPKEY.SQL(req.body.idname), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.PKEYONIDENT.ROUTE, (req,res) => {
  con.query(MODEL.PKEYONIDENT.SQL,MODEL.PKEYONIDENT.SQL_DATA(req.body), (err,result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  })
});

app.post(MODEL.PKEYOFFIDENT.ROUTE, (req,res) => {
  con.query(MODEL.PKEYOFFIDENT.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send({len: result.length});
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.CHECKIDENTKEY.ROUTE, (req,res) => {
  con.query(MODEL.CHECKIDENTKEY.SQL(req.body), (err,result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send({len: result.length});
    }
  });
})

app.post(MODEL.QUERYALL.ROUTE, (req,res) => {
  con.query(MODEL.QUERYALL.SQL(req.body), (err,result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send({result: result});
    }
  });
})

app.post(MODEL.QUERYPKEYS.ROUTE, (req,res) => {
  con.query(MODEL.QUERYPKEYS.SQL(req.body), (err,result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send({result: result});
    }
  });
})

app.post(MODEL.REMOVEPKEYRELATIONSIDENT.ROUTE, (req,res) => {
  con.query(MODEL.REMOVEPKEYRELATIONSIDENT.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.REMOVEIDENTRELATIONS.ROUTE, (req,res) => {
  con.query(MODEL.REMOVEIDENTRELATIONS.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});