const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  console.log(req.body);
  fs.writeFile(`./files/${req.body.title}.txt`, req.body.details, (err) => {
    res.redirect("/");
  });
});

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("show", { filename : req.params.filename, filedata: filedata });
  });
});

app.get("/profile/:username", (req, res) => {
  res.send("Well come " + req.params.username);
});

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
