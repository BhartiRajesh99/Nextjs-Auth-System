import connectDB from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, email } = reqBody;
    
    if(!token){
      return NextResponse.json({message: 'token  not found'}, {status: 500});
    }
    let user;
    if (email === "VERIFY") {
      user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() },
      });
    } else {
      user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      });
    }

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Token", sucess: false },
        { status: 500 }
      );
    }

    const res = NextResponse.json(
      { message: "Email Verified successfully", sucess: true },
      { status: 200 }
    );

    if (email === "VERIFY") {
      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();
    }

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
