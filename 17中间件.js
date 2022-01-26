const express = require("express");

const app = express();

// const mv = function (req, res, next) {
//   console.log("这是最简单的中间件函数");
//   next();
// };

// 将mv注册为全局生效的中间件
// app.use(mv);

app.use((req, res, next) => {
  console.log("中间件运行");
  const time = Date.now();
  req.require_time = time;
  next();
});
app.get("/", (req, res) => {
  res.send("Home Page" + req.require_time);
});
app.get("/user", (req, res) => {
  res.send("user Page");
});
app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
