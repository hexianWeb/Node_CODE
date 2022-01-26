// 导入mysql相关包
const mysql = require("mysql");

// 建立与数据库的连接
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "node_database",
});
const select_sql = "select * FROM user";
const insert_sql =
  "INSERT INTO `node_database`.`user` (`id`, `username`, `email`, `password`) VALUES ('4', 'two_test_man', '', '123456')";

db.query("select 1", (err, res) => {
  if (err) {
    console.log("连接异常" + err.message);
  }
  if (res.affectedRows === 1) {
    console.log("成功插入");
  }
});
