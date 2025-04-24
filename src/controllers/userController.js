import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, storeResetToken, getUserByResetToken, updateUserPassword } from '../models/user.model.js';
import Joi from 'joi';
import dotenv from 'dotenv';
import pool from '../config/db.js';

dotenv.config();

// register user schema
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(1024).required(),
    role: Joi.string().valid().default('user')

});

export const register = async (req, res) => {
    try {
        // Validate request body
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let { username, email, role, password } = req.body;

        // Check if user exists
        const existingUser = await getUserByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create user
        const result = await createUser(username, email, role, hashedPassword);

        // Generate token
        const token = jwt.sign({
            email: email,
            id: result.insertId,
            role
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(201).json({
            message: "User registered successfully!",
            user: { id: result.insertId, username, role, email },
            token
        });
    }
    catch (error) {
        console.error("Register controller error:", error.message);
        res.status(500).json({ message: "Internal server error in register controller", error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, existingUser[0].password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            email: existingUser[0].email,
            id: existingUser[0].id,
            role: existingUser[0].role
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({
            message: "User logged in successfully!",
            user: { id: existingUser[0].id, email: existingUser[0].email, role: existingUser[0].role },
            token
        });
    }
    catch (error) {
        console.error("Login controller error:", error.message);
        res.status(500).json({ message: "Internal server error in login controller", error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let { username, email, role, password } = req.body;
        // Hash password if provided
        if (password) {
            password = await bcryptjs.hash(password, 12);
        }

        const [result] = await pool.query(`
            UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?
        `, [username, email, role, password, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", result });

    }
    catch (error) {
        console.log("user controller error updateUser", error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`
            DELETE FROM users WHERE id = ?
        `, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.log("user controller error deleteUser", error.message);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
}


//forgrt password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if user exists
        const existingUser = await getUserByEmail(email);
        if (existingUser.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate token
        const token = crypto.randomBytes(20).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // 1 hour

        // Store token in database
        await storeResetToken(email, token, expiresAt);

        // Send email
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetUrl = `http://localhost:3000/reset-password/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Please click on the following link to reset your password: ${resetUrl}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Password reset email sent" });
    }
    catch (error) {
        console.error("Forgot password controller error:", error.message);
        res.status(500).json({ message: "Internal server error in forgot password controller", error: error.message });
    }
}


//reset password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "Token and password are required" });
        }

        // Validate token
        const user = await getUserByResetToken(token);
        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash new password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Update password
        await updateUserPassword(user[0].id, hashedPassword);

        res.status(200).json({ message: "Password reset successful" });
    }
    catch (error) {
        console.error("Reset password controller error:", error.message);
        res.status(500).json({ message: "Internal server error in reset password controller", error: error.message });
    }
}

