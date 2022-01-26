// 引入验证中间件
const joi = require("@hapi/joi");

// 定义验证规则

const name = joi.string().required();

const alias = joi.string().alphanum().required();

const id = joi.number().integer().min(1).required();

// 暴露新增规则
exports.addCates_schema = {
  body: {
    name,
    alias,
  },
};

// 暴露通过ID删除分类的规则
exports.deleteCatesById_schema = {
  params: {
    id,
  },
};

// 暴露通过ID查询分类的规则
exports.showCatesById_shcema = {
  params: {
    id,
  },
};
