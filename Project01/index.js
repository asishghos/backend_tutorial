const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile/:username", (req, res) => {
  res.send("Well come " + req.params.username);
});

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
