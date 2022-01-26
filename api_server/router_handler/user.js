// 导入数据库操作模块
const db = require("../db/index");

// 导入加密模块
const bcrypt = require("bcryptjs");

// 引入jsonwebtoken 用于生成JWT的中间件
const jwt = require("jsonwebtoken");
// 并配合导入config（JWT密钥）
const sercetKey = require("../config");

// 注册新用户的处理函数
exports.regUser = (req, res) => {
  // 判断账户密码不为空
  // 获取表单数据
  const userinfo = req.body;

  // 已弃用 使用JOI验证
  // if (!userinfo.username || !userinfo.password) {
  //   return res.cc("用户名密码不能为空");
  // }

  // 监测用户名是否被占用
  const check_sql = `select * from ev_user where username=?`;
  db.query(check_sql, [userinfo.username], (err, result) => {
    if (result.length > 0) {
      return res.cc("用户名已经存在");
    } else {
      // 对用户密码进行加密
      userinfo.password = bcrypt.hashSync(userinfo.password, 10);
      // 注册新用户
      const insert_sql = "INSERT INTO `node_database`.`ev_user` SET ?";
      // 执行SQL语句
      db.query(
        insert_sql,
        { username: userinfo.username, password: userinfo.password },
        (err, result) => {
          if (err) {
            return res.cc(err);
          } else if (result.affectedRows === 1) {
            // return res.send({ status: 202, msg: "插入成功"e});
            return res.cc("插入成功", 0);
          }
        }
      );
    }
  });
};

// 新用户登录的处理函数
exports.login = (req, res) => {
  // 登录模块处理函数
  // 获取表单数据
  const userinfo = req.body;
  // SQL语句 判断是否用该用户存在
  const login_check_sql = `select * from ev_user where username=?`;
  db.query(login_check_sql, [userinfo.username], (err, result) => {
    // 该账户不合法
    if (result.length === 0) {
      return res.cc("该账户名不存在");
    }
    // 对数据库中用户的密码进行解密操作 并与输入密码匹配
    // 这里调用bcryptjs中的compare函数 需要加密密码后置
    const Login_Result = bcrypt.compareSync(
      userinfo.password,
      result[0].password
    );
    if (Login_Result) {
      // 认证成功 服务器分配临时token
      // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
      const user = { ...result[0], password: "", user_pic: "" };
      // 利用jwt中间件生成token 过期时间为65s
      const tokenStr = jwt.sign(user, sercetKey.jwtSecretKey, {
        expiresIn: "10h",
      });
      // send发送token
      return res.send({
        status: 0,
        msg: "登陆成功",
        token: "Bearer " + tokenStr,
      });
    } else {
      return res.cc("用户密码不匹配");
    }
  });
};
