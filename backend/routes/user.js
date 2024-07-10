const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require("../models/user");
require('dotenv').config();

const jwtToken = process.env.JWT

router.post('/signup', async (req, res) => {
    const { name, email, role, password } = req.body;

    try {
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new userSchema({
            name,
            email,
            password: hashedPassword,
            role
        });
        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, jwtToken);

        // Save user to database
        await user.save();

        res.status(201).json({ message: "User created successfully", token, email: user.email,name:user.name });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, jwtToken);

        res.status(200).json({ message: "Login successful", token, email: user.email,name:user.name });
    } catch (error) {
        console.error('Error during login:', error); // Log the error for debugging
        res.status(500).json({ message: "Server error", error });
    }
});


module.exports = router;
