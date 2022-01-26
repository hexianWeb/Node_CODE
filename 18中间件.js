const express = require("express");
const app = express();

const mw1 = (req, res, next) => {
  console.log("局部生效");
  next();
};
app.get("/", mw1, (req, res) => {
  res.send("Home Page");
});
app.get("/user", (req, res) => {
  res.send("User Page");
});

app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
