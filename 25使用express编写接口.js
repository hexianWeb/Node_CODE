// 引入express模块
const express = require("express");
// 创建expres实例
const app = express();
// 固定写法 解析body内的内容 在解析发送之前引入
app.use(express.urlencoded({ extended: false }));
// 一定要在路由模块引入之前配置cors模块 从而解决接口跨域请求问题
const cors = require("cors");
app.use(cors());
// 引入路由模块
const apiRouter = require("./26使用express编写接口");
// 设置访问路径
app.use("/api", apiRouter);
app.listen(8081, () => {
  console.log("server running");
});
