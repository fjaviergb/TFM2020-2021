module.exports={
    LOGIN: {
        ROUTE: '/login',
        SQL(req) {
            return `SELECT * FROM users
             WHERE contact = "${req.contact}"
             AND password = "${req.passwd}"`
        }
    },

    REGISTER: {
        ROUTE: '/register',
        SQL: `INSERT INTO users SET ?`,
        SQL_DATA(req) {
            return {
                'name':req.name,
                'password':req.password,
                'created':new Date(),
                'contact':req.contact
            }
        }
    },

    GETADDRESSES: {
        ROUTE: '/getaddresses',
        SQL(idcl) {return `SELECT add_names.idad,name,alias,idname
        FROM add_names, addresses
        WHERE idcl = ${idcl}
        AND add_names.idad=addresses.idad`}
    },

    GETTAGS: {
        ROUTE: '/gettags',
        SQL(idcl) {return `SELECT tag_names.idta,name,alias,idname
        FROM tag_names, tags
        WHERE idcl = ${idcl}
        AND tag_names.idta=tags.idta`}
    },

    GETPUBLICKEYS: {
        ROUTE: '/getpublickeys',
        SQL(idcl) {return `SELECT pkey_names.idke,name,alias,idname
        FROM pkeys, pkey_names
        WHERE idcl = ${idcl}
        AND pkey_names.idke=pkeys.idke`}
    },

    CHANGETAG: {
        ROUTE: '/changetag',
        SQL: `REPLACE INTO tag_names SET ?`,
        SQL_DATA(req) {
            return {
                'idname':req.idta.toString() + req.idcl.toString(),
                'alias':req.alias,
                'idta': req.idta,
                'idcl': req.idcl
            }
        }
    },

    CHANGEADDRESS: {
        ROUTE: '/changeaddress',
        SQL: `REPLACE INTO add_names SET ?`,
        SQL_DATA(req) {
            return {
                'idname':req.idad.toString() + req.idcl.toString(),
                'alias':req.alias,
                'idad': req.idad,
                'idcl': req.idcl
            }
        }
    },

    CHANGEPKEY: {
        ROUTE: '/changepkey',
        SQL: `REPLACE INTO pkey_names SET ?`,
        SQL_DATA(req) {
            return {
                'idname':req.idname,
                'alias':req.alias,
                'idke': req.idke,
                'idcl': req.idcl
            }
        }
    },

    NEWTAG: {
        ROUTE: '/newtag',
        SQL: 'INSERT INTO tags SET ?',
        SQL_DATA(req) {
            return {
                'name': req.name,
                'created': new Date()
            }
        },
        SQL_CHECK(req) {return `SELECT * FROM tags WHERE name = '${req.name}'`}
    },

    NEWADDRESS: {
        ROUTE: '/newaddress',
        SQL: 'INSERT INTO addresses SET ?',
        SQL_DATA(req) {
            return {
                'name': req.name,
                'created': new Date()
            }
        },
        SQL_CHECK(req) {return `SELECT * FROM addresses WHERE name = '${req.name}'`}
    },

    NEWPKEY: {
        ROUTE: '/newpkey',
        SQL: 'INSERT INTO pkeys SET ?',
        SQL_DATA(req) {
            return {
                'name': req.name,
                'created': new Date()
            }
        },
        SQL_CHECK(req) {return `SELECT * FROM pkeys WHERE name = '${req.name}'`}
    },

    DELTAG: {
        ROUTE: '/deltag',
        SQL(idname) {return `DELETE FROM tag_names WHERE idname = ${idname}`} 
    },

    DELADDRESS: {
        ROUTE: '/deladdress',
        SQL(idname) {return `DELETE FROM add_names WHERE idname = ${idname}`} 
    },

    DELPKEY: {
        ROUTE: '/delpkey',
        SQL(idname) {return `DELETE FROM pkey_names WHERE idname = ${idname}`} 
    },

};