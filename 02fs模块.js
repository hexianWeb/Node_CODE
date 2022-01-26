// 1.导入 fs模块 来操作文件
const fs = require("fs");

// 2.调用fs 的writeFile函数 写入文件的内容
// 参数1：表示文件的存放路径
// 参数2：表示写入的内容
// 参数3: 编码格式 默认utf8
// 参数4： 回调函数
fs.writeFile("./files/2.txt", "这里是WriteFile函数", function (err) {
  if (err) {
    console.log("写入失败" + err.message);
  } else {
    console.log("写入成功");
  }
});
