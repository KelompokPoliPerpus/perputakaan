var mysql = require('mysql');
var dbconnect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbperpus"
});
module.exports = dbconnect