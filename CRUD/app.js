const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const userModel = require("./services");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.post("/create", async (req, res) => {
  await userModel.create({
    email: req.body.email,
    username: req.body.username,
  });
  res.redirect("/read");
  // res.render("index");
});

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/update/:id", async (req, res) => {
  let user = await userModel.findById(req.params.id);
  res.render("update", { user });
});

app.post("/update/:id", async (req, res) => {
  await userModel.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    email: req.body.email,
  });
  res.redirect("/read");
});

// app.get("/create", async (req, res) => {
//   let data = await userModel.create({ name: "John", age: 25 });
//   console.log("data");
//   res.send(data);
// });

// app.get("/update", async (req, res) => {
//   let data = await userModel.findOneAndUpdate(
//     { name: "John" },
//     { age: 26, name: "asish" },
//     { new: true }
//   );
//   console.log("data");
//   res.send(data);
// });

// app.get("/read", async (req, res) => {
//     let data = await userModel.find(
//         // { name: "John" }
//     );
//     console.log("data");
//     res.send(data);
//   });

// app.get("/delete", async (req, res) => {
//     let data = await userModel.findOneAndDelete(
//       { name: "asish" }
//     );
//     console.log("data");
//     res.send(data);
// });

app.listen(1100);
