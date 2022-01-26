const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.post("/book", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
app.listen(8081, () => {
  console.log("http://127.0.0.1:8081");
});
