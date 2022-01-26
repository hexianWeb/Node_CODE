const express = require("express");

const router = express.Router();

// 引入表单验证规则
const expressJoi = require("@escook/express-joi");

const {
  addCates_schema,
  deleteCatesById_schema,
  showCatesById_shcema,
} = require("../schema/artcate");

// 引入对应的处理模块
const artCates_handler = require("../router_handler/artcate");

// 映射路由 获取分类
router.get("/cates", artCates_handler.getArtCates);

// 映射路由 删除分类通过ID
router.get(
  "/deleteCate/:id",
  expressJoi(deleteCatesById_schema),
  artCates_handler.DeleteCatesById
);
// 映射路由 通过ID查询分类
router.get(
  "/cates/:id",
  expressJoi(showCatesById_shcema),
  artCates_handler.ShowCatesById
);
// 映射路由 新增分类
router.post(
  "/addcates",
  expressJoi(addCates_schema), //增加验证规则
  artCates_handler.AddArtCates
);
// 暴露路由模块
module.exports = router;
