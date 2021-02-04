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
    }

};