import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const otp = Math.floor(1000 + Math.random() * 9000); // 4 digit random

    // Gmail SMTP Transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Apna Gmail id .env me daalein
        pass: process.env.EMAIL_PASS, // Apna App Password .env me daalein
      },
    });

    const mailOptions = {
      from: `"Robo Rumble 26" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Registration OTP - Robo Rumble '26",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #050510; color: white; padding: 20px; border-radius: 10px;">
          <h2 style="color: #00ff9f;">Robo Rumble '26 Registration</h2>
          <p>Hello Leader,</p>
          <p>Your One-Time Password (OTP) for registration is:</p>
          <h1 style="background: #151f32; color: #00ff9f; padding: 10px; text-align: center; border: 1px solid #00ff9f; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
          <hr style="border: 0.5px solid #333;" />
          <p style="font-size: 10px; color: #666;">This is an automated email, please do not reply.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, otp });

  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json({ success: false, message: "Email failed" }, { status: 500 });
  }
}