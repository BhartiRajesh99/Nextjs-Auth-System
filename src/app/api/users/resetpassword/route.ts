import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import sendEmail from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "user not found", success: false },
        { status: 409 }
      );
    }

    const userId = user._id;
    await sendEmail({ email, emailType: "RESET", userId });

    return NextResponse.json(
      {
        message: "Password Reset Successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
