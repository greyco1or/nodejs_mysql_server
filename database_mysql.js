var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "admin1234",
  database: "o2",
});

connection.connect();

/*
var sql = "SELECT * FROM topic";

connection.query(sql, function (err, rows, fields) {
  if (err) {
    console.log(err);
  } else {
    for (var i = 0; i < rows.length; i++) {
      console.log(rows[i].title);
    }
  }
});
*/

/*
var sql =
  "INSERT INTO \
  topic \
  (title, description, author) \
  VALUES \
  (?, ?, ?)";

var params = ["Supervisor", "Watcher", "graphittie"];

connection.query(sql, params, function (err, rows, fields) {
  if (err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});
*/

/*
var sql = "UPDATE topic SET title=?, description=? WHERE id=?";

var params = ["NPM", "leezche", 1];

connection.query(sql, params, function (err, rows, fields) {
  if (err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});
*/

var sql = "DELETE from topic WHERE id=?";

var params = [1];

connection.query(sql, params, function (err, rows, fields) {
  if (err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});
connection.end();
