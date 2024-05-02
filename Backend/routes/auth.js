import express from "express";
const router = express.Router()
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

import { sendVerificationEmail, sendResetPasswordEmail } from '../utils/email.js'

dotenv.config();

// register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, name, termsAccepted, profilePicture } = req.body;

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword, name, termsAccepted, profilePicture });

        // Save the user to the database
        await newUser.save();
        await sendVerificationEmail(username, email, newUser._id)

        res.status(200).json({ message: "Register Successfully. Please verify your Email !!!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // console.log(user)
        if (!user) {
            return res.status(404).json("User not found!")
        }
        const match = await bcrypt.compare(req.body.password, user.password)

        if (!match) {
            return res.status(401).json("Wrong credentials!")
        }

        const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, process.env.SECRET, { expiresIn: "3d" })
        const { password, ...info } = user._doc
        res.cookie("token", token).status(200).json(info)

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// Logout
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User logged out successfully!")

    }
    catch (err) {
        res.status(500).json(err)
    }
})


// Verify Mail
router.get("/verifymail/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            console.log("user not found")
            return res.status(404).json({ message: "User not found" });
        }
        const updateInfo = await User.updateOne({ _id: user._id}, { $set: { is_verified: true } });

        // console.log(updateInfo);
        res.status(200).json({message:"Veified"})

    } catch (error) {
        // console.log(error.message);
        res.status(500).send("Failed to verify email");
    }
});

// Reset Password
router.post("/resetpassword", async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate JWT token for reset password
        const token = jwt.sign({ _id: user._id, email }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "15m" });

        // Send email with reset password link containing the token
        await sendResetPasswordEmail(email, token);

        res.status(200).json({ message: "Reset password link has been sent to your email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Update Password
router.post("/updatepassword", async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Verify the token
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Find user by email
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


// fetch user when refersh the page
router.get('/refetch', async (req, res) => {
    const token = req.cookies.token
    jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
        if (err) {
            return res.status(404).json(err);
        }
        res.status(200).json(data);
    })

})




export default router;
