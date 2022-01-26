//导入db中间件
const db = require("../db/index");

// 导入加密解密中间件
const bcrypt = require("bcryptjs");

// 用户信息的获取的处理函数
exports.userinfo_handler = (req, res) => {
  // 获取查询表单数据
  const userinfo = req.user;

  // 根据用户的 id，查询用户的基本信息(SQL语句)
  // 注意：为了防止用户的密码泄露，需要排除 password 字段
  const search_user_sql = `select id, username, nickname, email, user_pic from ev_user where id=?`;

  // 查询用户的个人信息
  db.query(search_user_sql, [userinfo.id], (err, result) => {
    // 如果连接数据库错误
    if (err) {
      return res.cc(err);
    }
    // 如果查询对象大于等于两人 或者等于 0人
    if (result.length >= 2 || result.length === 0) {
      return res.cc("您查询的对象有误");
    }
    // 返回正确的查询结果
    return res.send({
      status: 0,
      msg: "获取用户信息成功",
      data: result[0],
    });
  });
};

// 更新用户信息的路由处理函数
exports.updateUserInfo_handler = (req, res) => {
  // 获取用户的表单数据
  const userinfo = req.body;
  // 定义sql语句
  const update_sql = `update ev_user set ? where id = ?`;

  db.query(update_sql, [userinfo, userinfo.id], (err, result) => {
    // 如果连接数据库错误
    if (err) {
      return res.cc("数据库连接异常" + err.message);
    }
    if (result.affectedRows > 1) {
      return res.cc("数据更新异常");
    }
    return res.cc("修改成功", 0);
  });
};

// 更新用户密码的处理函数
exports.updatePawword_handler = (req, res) => {
  // 获取用户的基本信息
  const userinfo = req.user;
  // 获取用户的表单信息
  const updatePwd = req.body;
  // 检查用户密码的sql语句
  const checkPwd_sql = `select password from ev_user where id = ?`;
  db.query(checkPwd_sql, [userinfo.id], (err, result) => {
    // 数据库异常
    if (err) return res.cc(err);
    // 账户不合法
    if (result.length !== 1) {
      return res.cc("账户不合法");
    }
    // console.log(updatePwd.oldPwd);
    const check_flag = bcrypt.compareSync(updatePwd.oldPwd, result[0].password);
    console.log(check_flag);
    if (!check_flag) {
      return res.cc("初始密码错误");
    }
    // 更新密码的SQL
    const update_sql = `update ev_user set password=? where id=?`;
    // 密码加密
    const newPwd = bcrypt.hashSync(updatePwd.newPwd, 10);
    db.query(update_sql, [newPwd, userinfo.id], (err, result) => {
      // 数据库连接失败
      if (err) {
        return res.cc(err);
      }
      if (result.affectedRows != 1) {
        return res.cc("更新密码异常");
      }
      return res.cc("更新密码成功", 0);
    });
  });
};

// 更新用户头衔
exports.updateAvatar = (req, res) => {
  // 获取用户基本信息
  const userinfo = req.user;
  // 更新头像的sql
  const sql = "update ev_user set user_pic=? where id=?";
  db.query(sql, [req.body.avatar, userinfo.id], (err, result) => {
    // 数据库异常
    if (err) {
      return res.cc(err);
    }
    if (result.affectedRows != 1) {
      return res.cc("头像数据更新异常");
    }
    return res.cc("更新成功", 0);
  });
};
