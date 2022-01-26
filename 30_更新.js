// 导入mysql相关包
const mysql = require("mysql");

// 建立与数据库的连接
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "node_database",
});
const hexianMan = { id: 6, username: "changMan", password: "123456" };
const update_sql = "UPDATE `node_database`.`user` SET ?  WHERE ID =?";
db.query(update_sql, [hexianMan, hexianMan.id], (err, res) => {
  if (err) {
    console.log("连接异常" + err.message);
  } else if (res.affectedRows === 1) {
    console.log("成功修改");
  }
});
