//Constants
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const handlebars = require("express-handlebars");
const app = express();
const urlenconderParser = bodyParser.urlencoded({ extended: false });
// Conexão com Banco de Dados
const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
});
// Selecionando base de dados!
sql.query("use ifc");

app.use("/img", express.static("img"));
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));

//Engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Start server
app.listen(3000, function (req, res) {
  console.log("Servidor está rodando!");
});

//Routes
app.get("/", function (req, res) {
  res.render("index");

  app.get("/javascript", function (req, res) {
    res.sendFile(__dirname + "/js/javascript.js");
  });
});

app.get("/index", function (req, res) {
  res.render("index");
});

app.get("/cep", function (req, res) {
  res.render("cep");
});

app.get("/style", function (req, res) {
  res.sendFile(__dirname + "/css/style.css");
});

// --- Select ---
app.get("/select/:id?", function (req, res) {
  if (!req.params.id) {
    sql.query(
      "select aluno.*,  CEILING ((nota1+nota2+nota3)/3) AS media_final from aluno ",
      function (err, results, fields) {
        res.render("select", { data: results });
      }
    );
  } else {
    sql.query(
      "select * from aluno where id=? order by id asc",
      [req.params.id],
      function (err, results, fields) {
        res.render("select", { data: results });
      }
    );
  }
});

// --- Inserir ---
app.get("/inserir", function (req, res) {
  res.render("inserir");
});
app.post("/controllerForm", urlenconderParser, function (req, res) {
  sql.query("insert into aluno values (?,?,?,?,?,?)", [
    req.body.id,
    req.body.name,
    req.body.matricula,
    req.body.nota1,
    req.body.nota2,
    req.body.nota3,
  ]);
  res.render("controllerForm", { name: req.body.name });
});

// --- Deletar ---
app.get("/deletar/:id", function (req, res) {
  sql.query("delete from aluno where id=?", [req.params.id]);
  res.redirect("/");
});


