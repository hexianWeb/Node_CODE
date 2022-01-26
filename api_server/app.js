//导入express
const express = require("express");

// 导入joi验证中间件
const joi = require("@hapi/joi");

// 创建服务器实例
const app = express();

// 导入解析jwt的中间价
const express_jwt = require("express-jwt");
// 导入密钥
const sercetKey = require("./config");
// 在路由注册之前
app.use(
  express_jwt({ secret: sercetKey.jwtSecretKey, algorithms: ["HS256"] }).unless(
    { path: [/^\/api\//] }
  )
);

// 解析表单数据的中间件 x-www
app.use(express.urlencoded({ extended: false }));

// 导入并且配置cors中间件 注意use是带有
const cors = require("cors");
app.use(cors());

// 封装错误函数 res.cc
app.use((req, res, next) => {
  // status 默认状态为1
  // 表示失败情况
  // err可能是一个错误对象 也可能是一个字符串 利用三木运算符判断
  res.cc = function (err, status = 1) {
    res.send({
      status,
      msg: err instanceof Error ? err.msg : err,
    });
  };
  next();
});

// 导入注册登陆的路由模块
const userrouter = require("./router/user");
app.use("/api", userrouter);

// 导入用户基本信息的路由模块
const userinfo_Router = require("./router/userinfo");
app.use("/my", userinfo_Router);

// 导入文章的路由模块
const artcates_Router = require("./router/artcate");
app.use("/my/article", artcates_Router);

// 全局错误中间件
app.use((err, req, res, next) => {
  // 未持有token 或者token过期
  if (err.name === "UnauthorizedError") {
    // return res.cc("token过期");
    return res.send({ status: 1, msg: "token过期" });
  }
  //数据验证失败
  if (err instanceof joi.ValidationError) {
    return res.cc("数据验证失败" + err.message);
  }
  // 未知错误
  return res.cc(err);
});
// 启动服务器
app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
