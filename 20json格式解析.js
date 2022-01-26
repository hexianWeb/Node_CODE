const express = require("express");

const app = express();

//解析表单中的JSON格式数据
app.use(express.json());

app.post("/user", (req, res) => {
  // 在玩服务器中可以使用req.body属性接受客户端发送过来的请求体数据
  console.log(req.body);
  const resContent = req.body;
  res.send(resContent);
});

app.post("/book", (req, res) => {
  console.log(req.body);
  res.send("ok");
});
app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
