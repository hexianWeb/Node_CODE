// 1.导入 express
const express = require("express");
// 2.创建web服务器
const app = express();

// // 4.监听客户端的get和post请求
// app.get("/user", (req, res) => {
//   // 调用res.send方法 向客户端响应一个 JSON对象
//   res.send({ name: "hexian", method: "get" });
// });
// app.post("/user_post", (req, res) => {
//   // 调用express提供的res.send方法，向客户端响应一个 文本字符串
//   res.send("你通过POST请求访问了");
// });
app.get("/", (req, res) => {
  // 通过req.query可以获取客户端发送过来的查询对象
  // req默认为空
  console.log(req.query);
  res.send(req.query);
});
// 这里的id是一个动态参数可以是任意值
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});
// 3.启动web服务器
app.listen(8081, () => {
  console.log("服务器运行在：http://127.0.0.1:8081");
});
