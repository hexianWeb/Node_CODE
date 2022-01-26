// 引入express模块
// 1.导入 express
const express = require("express");

// 2.创建web服务器
const app = express();

// 3.帮助解析form格式的数据
const { urlencoded } = require("body-parser");

// 4.引入可以解析post发送的表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 5.引入JWT模块
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

// 6.定义密钥
const sercetKey = "Hexian";

// 7.注册JWT字符解析还原成JSON对象的中间件
// 只要配置成功了express-jwt这个中间件，就可以将其在req.user中解析出来
// 注意 在配置过程中需要指定某种加密算法这里用的是hash
app.use(
  expressjwt({ secret: sercetKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);
// app.use(expressjwt({ secret: sercetKey, algorithms: ["HS256"] }));

// 向session里存入数据
app.post("/api/login", (req, res) => {
  const userinfo = req.body;
  if (userinfo.username !== "hexian" || userinfo.password !== "123456") {
    return res.send({ status: 503, msg: "密码错误" });
  } else {
    // jwtwebtoken有三个参数
    const tokenStr = jwt.sign({ username: userinfo.username }, sercetKey, {
      expiresIn: "360s",
    });
    res.send({
      status: 200,
      msg: "登录成功",
      token: tokenStr,
    });
  }
});

app.get("/admin/userinfo", (req, res) => {
  console.log("已经访问" + req.user);
  res.send({
    status: 200,
    msg: "成功获取用户信息",
    data: req.user,
  });
});

// 全局错误处理的中间件
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      msg: "无效的token",
    });
  }
  res.sned({ status: 500, msg: "未知的错误" });
});
app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
// tips:jwt属于明文形式   即使有着加密，但还是有可能暴力破解，所以不建议将密码写入jwt的payload中
