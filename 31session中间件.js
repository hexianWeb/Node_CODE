// 引入express模块
// 1.导入 express
const { urlencoded } = require("body-parser");
const express = require("express");
// 2.创建web服务器
const app = express();

// 引入session中间件
const session = require("express-session");
app.use(
  session({
    // 固定写法
    resave: false,
    saveUninitialized: true,
    // 任意字符作为加密手段
    secret: "hexian",
  })
);

//引入可以解析post发送的表单数据的中间件
app.use(express.urlencoded({ extended: false }));
// 向session里存入数据

app.post("/login", (req, res) => {
  console.log(req.body.username);
  if (req.body.username !== "hexian" || req.body.password !== "123456") {
    return res.send({ status: 1, msg: "登录失败" });
  } else {
    req.session.user = req.body;
    req.session.islogin = true;
    res.send({ status: 0, msg: "success" });
  }
});

// 从session中读取信息
app.get("/get/username", (req, res) => {
  console.log("username");
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: "您未登录过" });
  } else {
    return res.send({ status: 0, msg: req.session.user.username });
  }
});
app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
