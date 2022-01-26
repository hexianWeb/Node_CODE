// 导入mysql相关包
const mysql = require("mysql");

// 建立与数据库的连接
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "node_database",
});
const testMan4 = { username: "hexianMan", password: "123456" };
const insert_sql2 = "INSERT INTO `node_database`.`user` SET ?";
db.query(insert_sql2, testMan4, (err, res) => {
  if (err) {
    console.log("连接异常" + err.message);
  } else if (res.affectedRows === 1) {
    console.log("成功插入");
  }
});
