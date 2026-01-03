import bcrypt from "bcrypt"
import crypto from "crypto"
import User from "../schema/user.schema";
import sendEmail from "../utils/sendEmail.utils";


export const signup = async (req, res) => {
  try {
    const { employeeId, name, email, password, role } = req.body;

    // 1️⃣ Validate input
    if (!employeeId || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { employeeId }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // 5️⃣ Create user
    await User.create({
      employeeId,
      name,
      email,
      password: hashedPassword,
      role: role || "EMPLOYEE",
      verificationToken
    });

    // 6️⃣ Verification URL
    const verifyURL = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    // 7️⃣ Send email via Resend
    await sendEmail({
      to: email,
      subject: "Verify your Dayflow account",
      html: `
        <h2>Welcome to Dayflow HRMS</h2>
        <p>Please verify your email to activate your account.</p>
        <a href="${verifyURL}">Verify Email</a>
      `
    });

    // 8️⃣ Response
    res.status(201).json({
      success: true,
      message: "Signup successful. Please verify your email."
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during signup"
    });
  }
};