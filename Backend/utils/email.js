import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { URL } from 'url';

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendVerificationEmail = async (username,email,id) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Welcome to our App! Please verify your email',
        html: `<p>Hello ${username},</p><br>
               <p>Thank you for registering . Please click <a href="http://localhost:5173/emailverified/${id}">here</a> to verify your email address.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};



export const sendResetPasswordEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Reset Password',
        html: `<p>You requested to reset your password. Please click <a href="http://localhost:5173/updatepassword/${token}">here</a> to reset your password.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Reset password email sent successfully");
    } catch (error) {
        console.error("Error sending reset password email:", error);
    }
};


