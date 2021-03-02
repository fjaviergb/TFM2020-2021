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

app.post(MODEL.GETADDRESSES.ROUTE, (req,res) => {
  con.query(MODEL.GETADDRESSES.SQL(req.body.idcl), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.GETTAGS.ROUTE, (req,res) => {
  con.query(MODEL.GETTAGS.SQL(req.body.idcl), (err, result) => {
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

app.post(MODEL.CHANGETAG.ROUTE, (req, res) => {
  con.query(MODEL.CHANGETAG.SQL, MODEL.CHANGETAG.SQL_DATA(req.body), (err, result) => {
      if (err) {
        console.log(err)
        res.status(404).json({ message: `Known error ${err.sqlMessage}` });
      } else if (result) {
        res.json({ idcl: req.body.idcl, alias: req.body.alias, idta:req.body.idta, idname:result.insertId});
      } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.CHANGEADDRESS.ROUTE, (req, res) => {
  con.query(MODEL.CHANGEADDRESS.SQL, MODEL.CHANGEADDRESS.SQL_DATA(req.body), (err, result) => {
      if (err) {
        console.log(err)
        res.status(404).json({ message: `Known error ${err.sqlMessage}` });
      } else if (result) {
        res.json({ idcl: req.body.idcl, alias: req.body.alias, idad:req.body.idad, idname:result.insertId});
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

app.post(MODEL.NEWADDRESS.ROUTE, (req, res) => {
  con.query(MODEL.NEWADDRESS.SQL_CHECK(req.body), (err,_result) => {
    if (_result.length === 0) {
      con.query(MODEL.NEWADDRESS.SQL, MODEL.NEWADDRESS.SQL_DATA(req.body), (err, result) => {
          if (err) {
            console.log(err)
            res.status(404).json({ message: `Known error ${err.sqlMessage}` });
          } else if (result) {
            console.log(result)
            res.json({ idad: result.insertId});
          } else if (err.errno===1062) { console.log(err.data)
            res.status(404).json({ message: err.data });
          } else {res.status(404).json({ message: "Unknown error; try again" });}
      });
    } else {res.json({ idad: _result[0].idad});}
  })
});

app.post(MODEL.NEWTAG.ROUTE, (req, res) => {
  con.query(MODEL.NEWTAG.SQL_CHECK(req.body), (err,_result) => {
    if (_result.length === 0) {
      con.query(MODEL.NEWTAG.SQL, MODEL.NEWTAG.SQL_DATA(req.body), (err, result) => {
          if (err) {
            console.log(err)
            res.status(404).json({ message: `Known error ${err.sqlMessage}` });
          } else if (result) {
            console.log(result)
            res.json({ idta: result.insertId});
          } else if (err.errno===1062) { console.log(err.data)
            res.status(404).json({ message: err.data });
          } else {res.status(404).json({ message: "Unknown error; try again" });}
      });
    } else {res.json({ idta: _result[0].idta});}
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

app.post(MODEL.DELTAG.ROUTE, (req,res) => {
  con.query(MODEL.DELTAG.SQL(req.body.idname), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});


app.post(MODEL.DELADDRESS.ROUTE, (req,res) => {
  con.query(MODEL.DELADDRESS.SQL(req.body.idname), (err, result) => {
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

app.post(MODEL.PKEYONADD.ROUTE, (req,res) => {
  con.query(MODEL.PKEYONADD.SQL,MODEL.PKEYONADD.SQL_DATA(req.body), (err,result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  })
});

app.post(MODEL.PKEYONTAG.ROUTE, (req,res) => {
  con.query(MODEL.PKEYONTAG.SQL,MODEL.PKEYONTAG.SQL_DATA(req.body), (err,result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  })
});

app.post(MODEL.PKEYOFFADD.ROUTE, (req,res) => {
  con.query(MODEL.PKEYOFFADD.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.PKEYOFFTAG.ROUTE, (req,res) => {
  con.query(MODEL.PKEYOFFTAG.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send({len: result.length});
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.CHECKADDKEY.ROUTE, (req,res) => {
  con.query(MODEL.CHECKADDKEY.SQL(req.body), (err,result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send({len: result.length});
    }
  });
})

app.post(MODEL.CHECKTAGKEY.ROUTE, (req,res) => {
  con.query(MODEL.CHECKTAGKEY.SQL(req.body), (err,result) => {
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

app.post(MODEL.REMOVEPKEYRELATIONSTAGS.ROUTE, (req,res) => {
  con.query(MODEL.REMOVEPKEYRELATIONSTAGS.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.REMOVEPKEYRELATIONSADDS.ROUTE, (req,res) => {
  con.query(MODEL.REMOVEPKEYRELATIONSADDS.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.REMOVEADDRESSRELATIONS.ROUTE, (req,res) => {
  con.query(MODEL.REMOVEADDRESSRELATIONS.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.status(404).json({ message: `Known error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.status(404).json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.REMOVETAGRELATIONS.ROUTE, (req,res) => {
  con.query(MODEL.REMOVETAGRELATIONS.SQL(req.body), (err, result) => {
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