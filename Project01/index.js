const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/profile/:username", (req, res) => {
  res.send("Well come " + req.params.username);
});

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
