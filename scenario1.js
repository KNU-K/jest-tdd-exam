const express = require("express");
const { UserService } = require("./services/scenario1.service");
const app = express();

const port = 7777;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/register", async (req, res) => {
  const user = req.body;
  if (UserService.isExistUser(user.userid)) {
    res.status(403).send("fail");
  } else {
    if (UserService.createUser(user)) {
      res.status(200).send("succeed");
    }
  }
});
app.post("/login", (req, res) => {
  const user = req.body;
  const result = UserService.auth(user.userid, user.userpw);
  if (result.state) {
    res.status(200).send("succeed");
  } else {
    res.status(403).send(result.msg);
  }
});
app.listen(port, () => {
  console.log(`server open port :: ${port}`);
});

module.exports = app;
