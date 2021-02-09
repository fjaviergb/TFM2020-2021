const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');
const dbConfig = require('./db-config.js')
const MODEL = require('./models.js');
var crypto = require("crypto");
const { PKEYONADD } = require("./models.js");

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
            res.json({ type: true, idcl: result[0].idcl, name: result[0].name, token: crypto.randomBytes(20).toString('hex')});
        } else {res.json({ type: false, message: "User/password incorrect" });}
    });
});

app.post(MODEL.REGISTER.ROUTE, (req, res) => {
  pool.query(MODEL.REGISTER.SQL, MODEL.REGISTER.SQL_DATA(req.body), (err, result) => {
      if (err) {
        console.log(err)
        res.json({ type: false, message: `Unknown error ${err.sqlMessage}` });
      } else if (result) {
        res.json({ type: true, idcl: result.insertId, name: req.body.name, token: crypto.randomBytes(20).toString('hex')});
      } else {res.json({ type: false, message: "Unknown error; try again" });}
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

app.post(MODEL.GETPUBLICKEYS.ROUTE, (req,res) => {
  pool.query(MODEL.GETPUBLICKEYS.SQL(req.body.idcl), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.CHANGETAG.ROUTE, (req, res) => {
  pool.query(MODEL.CHANGETAG.SQL, MODEL.CHANGETAG.SQL_DATA(req.body), (err, result) => {
      if (err) {
        console.log(err)
        res.json({ message: `Unknown error ${err.sqlMessage}` });
      } else if (result) {
        res.json({ idcl: req.body.idcl, alias: req.body.alias, idta:req.body.idta, idname:result.insertId});
      } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.CHANGEADDRESS.ROUTE, (req, res) => {
  pool.query(MODEL.CHANGEADDRESS.SQL, MODEL.CHANGEADDRESS.SQL_DATA(req.body), (err, result) => {
      if (err) {
        console.log(err)
        res.json({ message: `Unknown error ${err.sqlMessage}` });
      } else if (result) {
        res.json({ idcl: req.body.idcl, alias: req.body.alias, idad:req.body.idad, idname:result.insertId});
      } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.CHANGEPKEY.ROUTE, (req, res) => {
  pool.query(MODEL.CHANGEPKEY.SQL, MODEL.CHANGEPKEY.SQL_DATA(req.body), (err, result) => {
      if (err) {
        console.log(err)
        res.json({ message: `Unknown error ${err.sqlMessage}` });
      } else if (result) {
        res.json({ idcl: req.body.idcl, alias: req.body.alias, idke: req.body.idke, idname:result.insertId});
      } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.NEWADDRESS.ROUTE, (req, res) => {
  pool.query(MODEL.NEWADDRESS.SQL_CHECK(req.body), (err,_result) => {
    if (_result.length === 0) {
      pool.query(MODEL.NEWADDRESS.SQL, MODEL.NEWADDRESS.SQL_DATA(req.body), (err, result) => {
          if (err) {
            console.log(err)
            res.json({ message: `Unknown error ${err.sqlMessage}` });
          } else if (result) {
            console.log(result)
            res.json({ idad: result.insertId});
          } else if (err.errno===1062) { console.log(err.data)
            
          } else {res.json({ message: "Unknown error; try again" });}
      });
    } else {res.json({ idad: result[0]});}
  })
});

app.post(MODEL.NEWTAG.ROUTE, (req, res) => {
  pool.query(MODEL.NEWTAG.SQL_CHECK(req.body), (err,_result) => {
    if (_result.length === 0) {
      pool.query(MODEL.NEWTAG.SQL, MODEL.NEWTAG.SQL_DATA(req.body), (err, result) => {
          if (err) {
            console.log(err)
            res.json({ message: `Unknown error ${err.sqlMessage}` });
          } else if (result) {
            console.log(result)
            res.json({ idta: result.insertId});
          } else if (err.errno===1062) { console.log(err.data)
            
          } else {res.json({ message: "Unknown error; try again" });}
      });
    } else {res.json({ idta: result[0].idta});}
  })
});

app.post(MODEL.NEWPKEY.ROUTE, (req, res) => {
  pool.query(MODEL.NEWPKEY.SQL_CHECK(req.body), (err,_result) => {
    if (_result.length === 0) {
      pool.query(MODEL.NEWPKEY.SQL, MODEL.NEWPKEY.SQL_DATA(req.body), (err, result) => {
          if (err) {
            console.log(err)
            res.json({ message: `Unknown error ${err.sqlMessage}` });
          } else if (result) {
            console.log(result)
            res.json({ idke: result.insertId});
          } else if (err.errno===1062) { console.log(err.data)
            
          } else {res.json({ message: "Unknown error; try again" });}
      });
    } else {
      res.json({ idke: _result[0].idke});}
  })
});

app.post(MODEL.DELTAG.ROUTE, (req,res) => {
  pool.query(MODEL.DELTAG.SQL(req.body.idname), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});


app.post(MODEL.DELADDRESS.ROUTE, (req,res) => {
  pool.query(MODEL.DELADDRESS.SQL(req.body.idname), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});


app.post(MODEL.DELPKEY.ROUTE, (req,res) => {
  pool.query(MODEL.DELPKEY.SQL(req.body.idname), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.PKEYONADD.ROUTE, (req,res) => {
  pool.query(MODEL.PKEYONADD.SQL,MODEL.PKEYONADD.SQL_DATA(req.body), (err,result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  })
});

app.post(MODEL.PKEYONTAG.ROUTE, (req,res) => {
  pool.query(MODEL.PKEYONTAG.SQL,MODEL.PKEYONTAG.SQL_DATA(req.body), (err,result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  })
});

app.post(MODEL.PKEYOFFADD.ROUTE, (req,res) => {
  pool.query(MODEL.PKEYOFFADD.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.PKEYOFFTAG.ROUTE, (req,res) => {
  pool.query(MODEL.PKEYOFFTAG.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send({len: result.length});
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.CHECKADDKEY.ROUTE, (req,res) => {
  pool.query(MODEL.CHECKADDKEY.SQL(req.body), (err,result) => {
    if(err) {
      console.log(err);
    } else if (result) {
      res.send({len: result.length});
    }
  });
})

app.post(MODEL.CHECKTAGKEY.ROUTE, (req,res) => {
  pool.query(MODEL.CHECKTAGKEY.SQL(req.body), (err,result) => {
    if(err) {
      console.log(err);
    } else if (result) {
      res.send({len: result.length});
    }
  });
})

app.post(MODEL.QUERYALL.ROUTE, (req,res) => {
  pool.query(MODEL.QUERYALL.SQL(req.body), (err,result) => {
    if(err) {
      console.log(err);
    } else if (result) {
      res.send({result: result});
    }
  });
})

app.post(MODEL.QUERYPKEYS.ROUTE, (req,res) => {
  pool.query(MODEL.QUERYPKEYS.SQL(req.body), (err,result) => {
    if(err) {
      console.log(err);
    } else if (result) {
      res.send({result: result});
    }
  });
})

app.post(MODEL.REMOVEPKEYRELATIONSTAGS.ROUTE, (req,res) => {
  pool.query(MODEL.REMOVEPKEYRELATIONSTAGS.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.REMOVEPKEYRELATIONSADDS.ROUTE, (req,res) => {
  pool.query(MODEL.REMOVEPKEYRELATIONSADDS.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.REMOVEADDRESSRELATIONS.ROUTE, (req,res) => {
  pool.query(MODEL.REMOVEADDRESSRELATIONS.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

app.post(MODEL.REMOVETAGRELATIONS.ROUTE, (req,res) => {
  pool.query(MODEL.REMOVETAGRELATIONS.SQL(req.body), (err, result) => {
    if(err) {
      console.log(err);
      res.json({ message: `Unknown error ${err.sqlMessage}` });
    } else if (result) {
      res.send(result);
    } else {res.json({ message: "Unknown error; try again" });}
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});