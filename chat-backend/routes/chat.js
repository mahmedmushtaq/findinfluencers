const router = require("express").Router();
const {
  Index,
  create,
  messages,
  deleteChat,
  imageUpload,
  addUserToGroup,
  leaveCurrentChat,
  messageSeen,
} = require("../controllers/chatController");
const { auth } = require("../middleware/auth");
const { chatFile } = require("../middleware/fileUpload");

router.get("/", auth, Index);
router.get("/messages", auth, messages);
router.post("/create", auth, create);
router.post("/upload-image", auth, chatFile, imageUpload);
router.post("/add-users-to-group", auth, addUserToGroup);
router.post("/leave-current-chat", auth, leaveCurrentChat);
router.post("/message-seen", auth, messageSeen);
router.delete("/:id", auth, deleteChat);

module.exports = router;
