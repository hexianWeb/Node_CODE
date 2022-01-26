// 导入mysql模块
const mysql = require("mysql");

// 建立与数据库的连接
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "node_database",
});

// 暴露这个工具类
module.exports = db;
