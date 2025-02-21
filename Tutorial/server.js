const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((res, req, next) => {
    console.log("Middleware 1");
    next();
});

app.get("/", (req, res) => {
  res.send("Hello, Boys!");
});

app.get("/profile", (req, res) => {
  res.send("Profile page");
});

app.use((err, res, req, next) => {
    console.log(err.stack)
    req.status(500).send("Something went wrong");
})

app.listen(1600);
