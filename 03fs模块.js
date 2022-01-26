// 1.导入 fs模块 来操作文件
const fs = require("fs");

// 2.读取文件内容
fs.readFile("./files/1.txt", "utf8", function (err, data) {
  if (err) {
    return console.log("读取文件失败" + err.message);
  } else {
    console.log("读取文件成功!" + data);
  }
  //   3.分割成绩数据
  const arrOld = data.split(" ");
  const arrNew = [];
  arrOld.forEach((item) => {
    arrNew.push(item.replace("=", ":"));
  });
  //   4.合并写入目标文件
  const newStr = arrNew.join("\r\n");
  fs.writeFile("./files/2.txt", newStr, function (err) {
    if (err) {
      return console.log("寫入失敗" + err.message);
    }
    console.log("写入成功");
  });
});
