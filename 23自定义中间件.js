const express = require("express");

const app = express();
// 导入自己封装的中间件模块
const customBodyParser = require("./24封装为模块");
// 将自定义的中间件函数 注册为全局可用的中间键
app.use(customBodyParser);

app.post("/user", (req, res) => {
  res.send(req.body);
});
app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
