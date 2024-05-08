const User = require("../models/User");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    if (user.isFirstLogin) {
      res.json({
        message: "Please complete your password setup",
        isFirstLogin: true,
      });
    } else {
      res.json({ message: "Login successful", isFirstLogin: false });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});
