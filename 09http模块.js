// 1.导入http模块
const http = require("http");
// 2.创建web服务器实例
const server = http.createServer();
// 3.为服务器绑定request时间，监听客服端的请求
server.on("request", (req, res) => {
  // 获取客户端请求的url地址
  const url = req.url;
  //  获取客户端请求的方式
  const method = req.method;
  const str = `有人访问了服务器，请求的地址是${url}方式是${method}`;
  //   重新设置响应头 解决中文软吗格式
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  //   调用res.end()向客户端相应一些内容
  res.end(str);
});
// 4.启动服务器
server.listen(8080, function () {
  console.log("server running at http://127.0.0.1:8080");
});
