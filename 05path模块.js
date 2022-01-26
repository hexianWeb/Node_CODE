const path = require("path");
// ../会抵消掉一层路径
const pathStr = path.join("/home", "/hexian/c", "../", "/NODE_练习");
console.log(pathStr); // /home/hexian/NODE_练习
const pathStr2 = path.join(__dirname, "./files/1.txt");
console.log(pathStr2); // /home/hexian/Node_练习/files/1.txt
