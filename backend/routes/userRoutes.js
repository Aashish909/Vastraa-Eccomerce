const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//@router POST /api/users/register
//@desc Register a new user
//@access Public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Registration logic
    //res.send({ name, email, password });//for just checking
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    // res.status(201).json({
    //     user: {
    //         _id:user._id,
    //         name:user.name,
    //         email:user.email,
    //         role:user.role,
    //     }
    // })

    //Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    //sign and retutn the token along wiht user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;

        //send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//@route POST / api/users/login
//@desc Authentication user
//@access Public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //Find the user by email
    let user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "User not found. Please check your email and try again.",
      });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid password. Please try again." });

    //Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    //sign and retutn the token along wiht user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;

        //send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).send("Server Error!");
  }
});

//@route GET /api/users/profile
//@desc Get the logged in user's profile(Protected Route)
//@access Private

router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
