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
        SQL(idcl) {return `SELECT idk,key FROM pkeys
        WHERE idcl = ${idcl}`}
    },

};