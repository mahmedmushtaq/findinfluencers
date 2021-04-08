const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const chatRouter = require("./chat");

router.get("/home", (req, res) => {
  res.send({message: "hello world", params: req.params, query: req.query});
});

router.use("/", authRouter);
router.use("/user", userRouter);
router.use("/chats", chatRouter);

module.exports = router;
