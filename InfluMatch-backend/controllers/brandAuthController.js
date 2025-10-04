const BrandUser = require("../models/BrandUser");
const bcrypt = require("bcrypt");

// BUGFIX: The original function had parameters in the wrong order: (res, req).
// Express passes (req, res). Because of the swap, req.body was undefined,
// causing signup to fail and the frontend to show "something went wrong".
exports.signup = async (req, res) => {
    try {
        // Normalize and validate inputs
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        }

        // Check for existing user
        const existingUser = await BrandUser.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        // Hash password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const user = new BrandUser({
            email: normalizedEmail,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({
            msg: "Signup successful",
            userId: user._id,
            email: user.email,
        });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ msg: "Signup failed", error: err.message });
    }
};