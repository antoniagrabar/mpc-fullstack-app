const { Router } = require("express");
const SignUp = require("../controllers/SignUp");
const SignIn = require("../controllers/SignIn");
const auth = require("../controllers/auth");

const router = Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/auth", auth);

module.exports = router;
