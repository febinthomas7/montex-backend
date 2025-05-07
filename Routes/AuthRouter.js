const router = require("express").Router();
const {
  signin,
  login,
  request_reset,
  verify_otp,
  send_welcome_email,
} = require("../Controllers/AuthController");

const CheckAuthentication = require("../Controllers/CheckAuthenticated");

const userDp = require("../Controllers/UploadFile");

const multer = require("multer");

const userModal = require("../Models/userModel");

const upload = multer({ storage: multer.memoryStorage() });
const {
  signinValidation,
  logininValidation,
} = require("../Middlewares/AuthValidation");
router.post("/signin", signinValidation, signin);

router.post("/login", logininValidation, login);
router.post("/request-reset", request_reset);
router.post("/send-welcome-email", send_welcome_email);

router.post("/verify-otp", verify_otp);

router.get("/userlist", async (req, res) => {
  try {
    const movies = await userModal
      .findOne({ _id: req.query.userId })
      .populate({ path: "watchlist", options: { sort: { createdAt: -1 } } });

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
});

router.get("/continueList", async (req, res) => {
  try {
    const movies = await userModal.findOne({ _id: req.query.userId }).populate({
      path: "continue",
      options: { sort: { createdAt: -1 } }, // Sort by createdDate in ascending order
    });

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
});

router.put("/upload", upload.single("avatar"), userDp);

router.get("/check-auth", CheckAuthentication);

router.get("/deleteuserprofileinfo", async (req, res) => {
  const { userid, item } = req.query;
  try {
    const user = await userModal.findById(userid);
    if (item == "dp") {
      user.dp = null;
    }
    if (item == "backgroundImg") {
      user.backgroundImg = null;
    }
    await user.save();

    res.status(200).json({
      message: "Profile deleted successfully",
      success: true,
      dp: user.dp,
      background: user.backgroundImg,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", success: false });
    console.error("Error deleting profile:", error);
  }
});

router.post("/customContent", async (req, res) => {
  try {
    const { language, genre, country } = req.body;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Update user preferences
    const updatedUser = await userModal.findByIdAndUpdate(
      userId,
      { language, genre, country },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Preferences updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating preferences", error });
  }
});

module.exports = router;
