// imports connection to mysql
var connection = requrie("../config/connection.js");

// print question marks
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// object to sql
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        if (Object.hasOwnProperty.call(ob, key)) {
            arr.push(key + "=" + ob[key]);
        }
    }
    return arr.toString();
}

// for sql functions
var orm = {
        // for everything
all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {

            // add connection.query
            // dont forget to throw error
            connection.query(queryString, function (err, result) {
                if (err) {
                    throw err;
                }
                cb(result);
            });
        },

        // create function -- creates the table for the the values
        create: function (table, cols, vals, cb) {
            var queryString = "INSERT INTO " + table;
            queryString += " (";
            queryString += cols.toString();
            queryString += ")";
            queryString += "VALUES (";
            queryString += printQuestionMarks();
            queryString += ") ";

            console.log(queryString);

            //connection.query 
            connection.query(queryString, vals, function (err, result) {
                if (err) {
                    throw err;
                }
                cb(result);
            });
        },

        // updates the table with new info
        update: function (table, objColValues, condition, cb) {
            var queryString = "UPDATE " + table;

            // add query string += ...
            queryString += " SET ";
            queryString += objToSql(objColVals);
            queryString += " WHERE ";
            queryString += condition;

            console.log(queryString);

            // connection.query
            connection.query(queryString, function (err, result) {
                if (err) {
                    throw err;
                }
                cb(result);
            });
        }
    };
    module.exports = orm;