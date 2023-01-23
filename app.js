// IMPORTACOES.
const express = require("express");
const app = express();
const path = require("path");
// const controlaArquivos = require("fs");
// const mongoose = require("");

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


app.get("/admin", function (req, res) {
  res.sendFile(__dirname + "/public/html/admin/admin.html");
});

// Outros.
const PORT = process.env.PORT || 8081;
try {
  app.listen(PORT, () => {
    console.log(
      __dirname,
      "servidor rodando !!! para entrar, http://localhost:8081/ !!!"
    );
  });
} catch (error) {
  console.log("Servidor não rodou !!! , pois : ", error);
}
