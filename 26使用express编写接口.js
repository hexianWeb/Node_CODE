// 路由模块
const express = require("express");

const apiRouter = express.Router();

apiRouter.get("/get", (req, res) => {
  // 通过req.query获取客服端查询字符 发送到服务器的数据
  const query = req.query;
  res.send({
    status: 0,
    msg: "GET success",
    data: query,
  });
});

apiRouter.post("/post", (req, res) => {
  // 通过req.body 获取请求体中包含的url-encoded内容
  const body = req.body;
  res.send({
    status: 0,
    msg: "POST success",
    data: body,
  });
});
module.exports = apiRouter;
