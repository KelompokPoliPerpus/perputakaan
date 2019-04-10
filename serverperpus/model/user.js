var pool = require("./databaseConfig");
var userDB = {
    login: function (useremail, userpassword, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("connected!")
                var sql = 'SELECT * FROM user where useremail =? and userpassword=?';
                conn.query(sql, [useremail, userpassword], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },

    addUser: function (username, useremail, userpassword, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("connected!");
                var sql = 'INSERT INTO user(username, useremail, userpassword) values (?,?,?)';
                conn.query(sql, [username, useremail, userpassword], function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },
}
module.exports = userDB
