import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel.js";
import connectDB from "@/dbConfig/dbConfig";
import sendEmail from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    if (!username && !email && !password) {
      return NextResponse.json(
        {
          message: "Fields are required",
          success: false,
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          message: "User already exist",
          success: false,
        },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id})

    return NextResponse.json(
      {
        message: "User Successfully Registered",
        user: savedUser,
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
