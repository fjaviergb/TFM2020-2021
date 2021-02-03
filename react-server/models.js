module.exports={
    LOGIN: {
        ROUTE: '/login',
        SQL(req) {
            return `SELECT * FROM users
             WHERE contact = "${req.contact}"
             AND password = "${req.passwd}"`
        }
    }

};