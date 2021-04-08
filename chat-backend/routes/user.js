const router = require("express").Router();
const { update, search, me } = require("../controllers/userController");
const { auth } = require("../middleware/auth");
const { userFile } = require("../middleware/fileUpload");

router.post("/update", [auth, userFile], update);
router.get("/search-users", auth, search);
router.get("/me", auth, me);

module.exports = router;
