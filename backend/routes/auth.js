const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");  // 🔴 You forgot this

router.use(cookieParser());  // 🔴 Middleware to enable cookies

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Wrong credentials!" });
        }

        // Generate token
        const token = jwt.sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.SECRET,
            { expiresIn: "3d" }
        );

        // Set secure cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,    // Required for HTTPS
            sameSite: "None" // Required for cross-origin cookies
        }).status(200).json({ username: user.username, email: user.email });

    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGOUT
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "None", secure: true })
            .status(200)
            .json({ message: "User logged out successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// REFETCH USER (Check Authentication)
router.get("/refetch", (req, res) => {
    console.log("Cookies received:", req.cookies);  // 🔴 Debugging cookies

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        res.status(200).json(data);
    });
});

module.exports = router;
