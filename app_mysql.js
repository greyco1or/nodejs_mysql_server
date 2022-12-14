var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "admin1234",
  database: "o2",
});
conn.connect();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", "./views_mysql");
app.set("view engine", "pug");
app.post("/topic/:id/delete", function (req, res) {
  var id = req.params.id;
  var sql = "DELETE FROM topic WHERE id=?";
  conn.query(sql, [id], function (err, result) {
    res.redirect("/topic");
  });
});
app.get("/topic/:id/delete", function (req, res) {
  var sql = "SELECT id, title FROM topic";
  var id = req.params.id;
  conn.query(sql, function (err, rows, fields) {
    var sql = "SELECT * FROM topic WHERE id=?";
    conn.query(sql, [id], function (err, row) {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        if (row.length === 0) {
          console.log("There is no record");
          res.status(500).send("Internal Server Error");
        } else {
          res.render("delete", { topics: rows, topic: row[0] });
        }
      }
    });
  });
});
app.post("/topic/:id/edit", function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = "UPDATE topic SET title=?, description=?, author=? WHERE id=?";
  conn.query(
    sql,
    [title, description, author, id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.redirect("/topic/" + id);
      }
    }
  );
});
app.get("/topic/:id/edit", function (req, res) {
  var sql = "SELECT id, title FROM topic";
  conn.query(sql, function (err, rows, fields) {
    var id = req.params.id;
    if (id) {
      var sql = "SELECT * FROM topic WHERE id=?";
      conn.query(sql, [id], function (err, row, fields) {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.render("edit", { topics: rows, topic: row[0] });
        }
      });
    } else {
      console.log("There is no id.");
      res.status(500).send("Internal Server Error");
    }
  });
});
app.post("/topic/add", function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = "INSERT INTO topic (title, description, author) values (?,?,?)";
  conn.query(sql, [title, description, author], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send("INternal Server Error");
    } else {
      res.redirect("/topic/" + rows.insertId);
    }
  });
});
app.get("/topic/add", function (req, res) {
  var sql = "SELECT id, title FROM topic";
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send("INternal Server Error");
    }
    res.render("add", { topics: rows });
  });
});
app.get(["/topic", "/topic/:id"], function (req, res) {
  var sql = "SELECT id, title FROM topic";
  conn.query(sql, function (err, rows, fields) {
    var id = req.params.id;
    if (id) {
      var sql = "SELECT * FROM topic WHERE id=?";
      conn.query(sql, [id], function (err, row, fields) {
        if (err) {
          console.log(err);
        } else {
          res.render("view", { topics: rows, topic: row[0] });
        }
      });
    } else {
      res.render("view", {
        topics: rows,
      });
    }
  });
});
app.listen(3000, function () {
  console.log("Connected 3000 port");
});
