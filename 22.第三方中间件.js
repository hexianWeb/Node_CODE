const express = require("express");

const app = express();

// 导入第三方表单解析中间件
const parser = require("body-parser");
app.use(parser.urlencoded({ extended: false }));
app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("ok");
});
app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
