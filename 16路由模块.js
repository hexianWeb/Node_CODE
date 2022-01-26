const express = require("express");
const app = express();

// 1.导入路由模块
const router = require("./15路由对象");

app.use(router);

app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
