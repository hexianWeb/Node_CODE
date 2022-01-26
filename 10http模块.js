const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  //1.获取请求的url地址
  const url = req.url;
  //2. 默认设置 404NotFonud
  let content = "<h1> 404 Not Found</h1>";
  //3. 判断用户请求的页面
  if (url == "/" || url == "/index.html") {
    content = "<h1>首页</h1>";
  } else if (url == "/about.html") {
    content = "<h1>关于页面</h1>";
  }
  //4.设置响应体
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // 5.返回对象
  res.end(content);
});

server.listen(8080, () => {
  console.log("server running at http://127.0.0.1:8080");
});
