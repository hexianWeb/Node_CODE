// 引入db模块
const db = require("../db/index");

// 向外暴露 获取文章分类的路由函数
exports.getArtCates = (req, res) => {
  // 根据分类的状态，获取所有未被删除的分类列表数据
  // is_delete 为 0 表示没有被 标记为删除 的数据
  const sql = "select * from ev_article_cate where is_delete=0 order by id asc";
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc("数据库连接异常");
    }
    return res.send({
      status: 0,
      msg: "文章分类信息成功返回",
      data: results,
    });
  });
};

// 向外暴露 新增文章分类的路由函数
exports.AddArtCates = (req, res) => {
  // 获取表单信息
  const Artinfo = req.body;

  // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
  const sql = `select * from ev_article_cate where name=? or alias=?`;

  // 执行查重操作
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 分类名称 和 分类别名 都被占用
    if (results.length === 2)
      return res.cc("分类名称与别名被占用，请更换后重试！");
    if (
      results.length === 1 &&
      results[0].name === req.body.name &&
      results[0].alias === req.body.alias
    )
      return res.cc("分类名称与别名被占用，请更换后重试！");
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc("分类名称被占用，请更换后重试！");
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc("分类别名被占用，请更换后重试！");

    //   新增分类的SQL
    const add_sql = `insert into ev_article_cate set ?`;
    db.query(add_sql, Artinfo, (err, results) => {
      if (err) return res.cc("数据库异常");

      if (results.affectedRows != 1) {
        return res.cc("数据更新异常");
      }
      return res.cc("数据更新成功", 0);
    });
  });
};

// 向外暴露 删除分类通过ID的处理函数
exports.DeleteCatesById = (req, res) => {
  const id = req.params.id;
  // 删除文章通过id的SQL
  const sql = `update ev_article_cate set is_delete=1 where id=?`;

  db.query(sql, id, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.affectedRows !== 1) {
      return res.cc("数据删除异常");
    }
    return res.cc("数据删除成功", 0);
  });
};

exports.ShowCatesById = (req, res) => {
  const id = req.params.id;

  // 查询为被删除的ID符合的文章
  const sql = `select * from ev_article_cate where id=? and is_delete = 0`;

  db.query(sql, id, (err, results) => {
    if (err) {
      return res.cc(err);
    }
    if (results.length != 1) {
      if (results.length == 0) {
        return res.cc("该分类已被删除");
      }
      return res.cc("数据查询异常");
    }
    return res.send({
      status: 0,
      msg: "数据成功返回",
      data: results[0],
    });
  });
};
