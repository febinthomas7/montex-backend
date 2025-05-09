const router = require("express").Router();
const {
  signin,
  login,
  request_reset,
  verify_otp,
  send_welcome_email,
} = require("../Controllers/AuthController");

const payment = require("../Controllers/stripe");

const CheckAuthentication = require("../Controllers/CheckAuthenticated");

const userDp = require("../Controllers/UploadFile");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const {
  signinValidation,
  logininValidation,
} = require("../Middlewares/AuthValidation");
const { cart, deleteCart } = require("../Controllers/cart");
const getOrders = require("../Controllers/orders");
router.post("/signin", signinValidation, signin);

router.post("/login", logininValidation, login);
router.post("/request-reset", request_reset);
router.post("/send-welcome-email", send_welcome_email);

router.post("/verify-otp", verify_otp);

router.post("/create-checkout-session", payment);
router.post("/cart", cart);
router.delete("/cart/:id", deleteCart);

router.get("/orders", getOrders);

router.put("/upload", upload.single("avatar"), userDp);

router.get("/check-auth", CheckAuthentication);

module.exports = router;
