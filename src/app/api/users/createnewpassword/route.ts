import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import connectDB from "@/dbConfig/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or Expired Token",
          success: false,
        },
        { status: 400 }
      );
    }
    const newHashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = newHashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password Resset Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error in Reset Password", success: false, error: error },
      { status: 500 }
    );
  }
}
