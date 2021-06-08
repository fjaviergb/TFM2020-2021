module.exports={
    LOGIN: {
        ROUTE: '/login',
        SQL(req) {
            return `SELECT * FROM users
             WHERE contact = "${req.body.contact}"
             AND password = "${req.pswd}"`
        }
    },

    REGISTER: {
        ROUTE: '/register',
        SQL: `INSERT INTO users SET ?`,
        SQL_DATA(req) {
            return {
                'name':req.body.name,
                'password':req.pswd,
                'created':new Date(),
                'contact':req.body.contact
            }
        }
    },

    GETIDENTIFIERS: {
        ROUTE: '/getident',
        SQL(idcl) {return `SELECT ident_names.idid,name,alias,idname
        FROM ident_names, identifiers
        WHERE idcl = ${idcl}
        AND ident_names.idid=identifiers.idid`}
    },

    GETPUBLICKEYS: {
        ROUTE: '/getpublickeys',
        SQL(idcl) {return `SELECT pkey_names.idke,name,alias,idname
        FROM pkeys, pkey_names
        WHERE idcl = ${idcl}
        AND pkey_names.idke=pkeys.idke`}
    },

    CHANGEIDENT: {
        ROUTE: '/changeident',
        SQL: `REPLACE INTO ident_names SET ?`,
        SQL_DATA(req) {
            return {
                'idname':req.idname,
                'alias':req.alias,
                'idid': req.idid,
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

    NEWIDENT: {
        ROUTE: '/newident',
        SQL: 'INSERT INTO identifiers SET ?',
        SQL_DATA(req) {
            return {
                'name': req.name,
                'created': new Date()
            }
        },
        SQL_CHECK(req) {return `SELECT * FROM identifiers WHERE name = '${req.name}'`}
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

    DELIDENT: {
        ROUTE: '/delident',
        SQL(idname) {return `DELETE FROM ident_names WHERE idname = ${idname}`} 
    },

    DELPKEY: {
        ROUTE: '/delpkey',
        SQL(idname) {return `DELETE FROM pkey_names WHERE idname = ${idname}`} 
    },

    PKEYONIDENT: {
        ROUTE: '/pkeyonident',
        SQL: 'INSERT INTO pkeys_ident SET ?',
        SQL_DATA(req) {
            return {
                'idke': req.idke,
                'idid': req.idid,
                'idcl': req.idcl
            }
        },
    },

    PKEYOFFIDENT: {
        ROUTE: '/pkeyoffident',
        SQL(req) {return `DELETE FROM pkeys_ident
                     WHERE idke = ${req.idke}
                     AND idid=${req.idid}
                     AND idcl=${req.idcl}`} 
    },

    CHECKIDENTKEY: {
        ROUTE: '/checkidentkey',
        SQL(req) {return `SELECT idke FROM pkeys_ident
                WHERE idid=${req.idid}
                AND idcl=${req.idcl}
                AND idke=${req.idke}`}
    },

    QUERYALL: {
        ROUTE: '/queryall',
        SQL(req) {return `SELECT * FROM messages WHERE ${req.query}`}
    },

    QUERYPKEYS: {
        ROUTE: '/querypkeys',
        SQL(req) {return `SELECT idke
                            FROM pkeys_ident
                            WHERE pkeys_ident.idid=${req.idid} AND pkeys_ident.idcl=${req.idcl}`
                }
    },

    REMOVEPKEYRELATIONSIDENT: {
        ROUTE: '/removepkeyrelationsident',
        SQL(req) {return `DELETE FROM pkeys_ident
                    WHERE idke = ${req.idke}
                    AND idcl=${req.idcl}`}
    },

    REMOVEIDENTRELATIONS: {
        ROUTE: '/removeidentrelations',
        SQL(req) {return `DELETE FROM pkeys_ident
                    WHERE idid = ${req.idid}
                    AND idcl=${req.idcl}`}
    },
};
