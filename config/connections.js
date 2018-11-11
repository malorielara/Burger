// set up mysql 
var mysql = require("mysql");

var connection = mysql.createConnection({
    port: 8080,
    host: "localhost",
    user: "root",
    database: "burgers_db"
});

// make the connection
connection.connect(function(err) {
    if(err) {
        console.log("error connecting:" + err.stack);
        return;
    }
    console.log("Connected as id: " + connection.threadId)
});

module.exports = connection;
