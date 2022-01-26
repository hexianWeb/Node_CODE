// 导入express模块
const express = require("express");

// 声明router路由
const router = express.Router();

// 导入表单验证中间件
const expressJoi = require("@escook/express-joi");

// 导入用户更新的验证规则
const { update_shcema, update_password_schema } = require("../schema/user");
// 导入用户更新头像的规则
const { update_avatar_schema } = require("../schema/user");

// 引入对应的处理模块
const userinfo_Router = require("../router_handler/userinfo");

// 用户信息获取的映射路由
router.get("/userinfo", userinfo_Router.userinfo_handler);

// 用户更新的映射路由
router.post(
  "/userinfo",
  expressJoi(update_shcema),
  userinfo_Router.updateUserInfo_handler
);

// 更新用户密码的映射路由
router.post(
  "/updatepwd",
  expressJoi(update_password_schema),
  userinfo_Router.updatePawword_handler
);

// 更新用户头像的映射路由
router.post(
  "/update/avatar",
  expressJoi(update_avatar_schema),
  userinfo_Router.updateAvatar
);
// 暴露这个路由模块
module.exports = router;
