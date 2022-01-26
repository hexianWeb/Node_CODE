// 1.导入 fs模块 来操作文件
const fs = require("fs");

// 2.调用fs 的readFile方法获取文件
// 参数1：读取文件的存放路径
// 参数2：读取时的编码格式 默认一般为 utf8
// 参数3：回调函数 拿取读取成功和失败的结果
fs.readFile("./files/1.txt", "utf8", function (err, dataStr) {
  if (err) {
    console.log("读取文件失败");
  }
  //   打印成功的结果
  console.log("文件的内容是" + dataStr);
});
