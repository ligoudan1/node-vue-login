const mysql = require('mysql');
const co = require('co-mysql');
const config = require('../config/db-config');

const db = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
})

module.exports = co(db);