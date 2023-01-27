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
    "mongodb+srv://marcaozitos:enquebravel1@cluster0.zub3f.mongodb.net/test"
  )
  .then(() => {
    console.log(" Conectou com o Mongodb !!!");
  })
  .catch((erro) => {
    console.log("não foi possivel conectar ao mongo, pois: " + erro);
  });

// ---> Public.
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/comunidade", function (req, res) {
  res.sendFile(__dirname + "/public/html/comunidade.html");
});

app.get("/categorias", function (req, res) {
  res.sendFile(__dirname + "/public/html/categorias.html");
});

app.get("/contato", function (req, res) {
  res.sendFile(__dirname + "/public/html/contato.html");
});

app.get("/recentes", function (req, res) {
  res.sendFile(__dirname + "/public/html/recentes.html");
});

app.get("/entrar", function (req, res) {
  res.sendFile(__dirname + "/public/html/login/entrar.html");
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
