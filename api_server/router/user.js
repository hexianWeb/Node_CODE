//导入express模块
const express = require("express");

// 声明router路由
const router = express.Router();

// 引入router_handler中的对应处理模块
const userRouter = require("../router_handler/user");

// 导入表单验证中间件
const expressJoi = require("@escook/express-joi");
// 导入用户注册验证规则
const { reg_login_shcema } = require("../schema/user");
// 注册新用户
// 加入验证Joi后，所发送的数据 会先通过expressJoi匹配是否合格，合格按原逻辑进行操作 不合格就会爆出全局ERR 由全局错误处理中间件处理
router.post("/regUser", expressJoi(reg_login_shcema), userRouter.regUser);

//登录
// 登录与注册复用同一验证方式（基础的形式验证）
router.post("/login", expressJoi(reg_login_shcema), userRouter.login);

// 暴露这个路由模块
module.exports = router;
