// querystring 模块 解析请求体数据

const querystring = require("querystring");

// 这是解析表单数据的中间件
const bodyParser = (req, res, next) => {
  // 定义中间件具体的业务逻辑
  let str = "";
  // data事件 当有数据传输过来时 就会触发 data量大的话 data事件会触发好几次
  req.on("data", (chunk) => {
    // 拼接请求体数据 隐式转换为字符串
    str += chunk;
  });
  // end事件，当data传输完毕时 就会触发end事件
  req.on("end", () => {
    // 在str中存放的是完整的请求体数据
    // console.log(str);
    // 把字符串格式的请求体数据解析成对象格式
    const body = querystring.parse(str);
    console.log(body);
    req.body = body;
    next();
  });
};

module.exports = bodyParser;
