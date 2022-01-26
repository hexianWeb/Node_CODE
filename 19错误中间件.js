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
  // 人为制造错误
  throw new Error("这是一个错误");
  res.send("User Page");
});
// 定义错误级别的中间件，捕获整个项目的异常错误，防止程序的崩溃
app.use((err, req, res, next) => {
  console.log("发生了错误" + err.message);
  res.send("Error:" + err.message);
});
app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
