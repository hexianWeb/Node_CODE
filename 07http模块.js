// 1.导入http模块
const http = require("http");
// 2.创建web服务器实例
const server = http.createServer();
// 3.为服务器绑定request时间，监听客服端的请求
server.on("request", function (req, res) {
  console.log("有人访问了服务器");
});
// 4.启动服务器
server.listen(8080, function () {
  console.log("已经运行在本机的8080端口了");
});
