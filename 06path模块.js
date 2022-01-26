const path = require("path");

// 定义一个文件的存放路径
const fpath = "/home/hexian/Node_练习/files/1.txt";

const fullName = path.basename(fpath);
console.log(fullName); // 1.txt

const nameWithoutExt = path.basename(fpath, ".txt");
console.log(nameWithoutExt); //1

const Ext = path.extname(fpath);
console.log(Ext); //txt
