// aplicativo.
const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

// corpo.
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

// arquivos.
const path = require("path");
// const fs = require("fs");

// banco de dados.
const admin = require("./routes/admin");
const mongoose = require("mongoose");
const db = require("./config/db")

// Configurações.

// ---> Sessão.
app.use(
  session({
    secret: "luguiGeron",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
// ---> Midleware.
app.use((req, res, next) => {
  // Variavel global.
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
// ---> body parser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// ---> handlebars.
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
// ---> mongoose.
mongoose.Promise = global.Promise;
mongoose
  .connect(
    db.MongoURI
  )
  .then(() => {
    console.log(` SO=  ${process.platform}
    Conectou com o Mongodb !!! 
    URL = ${db.MongoURI}`);
  })
  .catch((erro) => {
    console.log(db.MongoURI,
      "\n Não foi possivel conectar ao mongo, pois: "
      +
      erro);
  });

// ---> Public.
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/comunidade", function (req, res) {
  res.render("html/comunidade");
});

app.get("/categorias", function (req, res) {
  res.render("html/categorias");
});

app.get("/contato", function (req, res) {
  res.render("html/contato");
});

app.get("/recentes", function (req, res) {
  res.render("html/recentes");
});

app.get("/entrar", function (req, res) {
  res.render("conta/entrar");
});

// adm esta on.
app.use("/admin", admin);


// Outros.
const PORT = process.env.PORT || 8081;
try {
  app.listen(PORT, () => {
    console.log("\n",
      __dirname,
      "\n Servidor rodando !!! para entrar, \n http://localhost:8081/ !!!"
    );
  });
} catch (error) {
  console.log("Servidor não rodou !!! , pois : ", error);
}
