import { NextResponse } from "next/server";

export function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfull",
      status: 200,
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: "Logout failed",
      error: error.message,
      status: 500,
      success: false,
    });
  }
}
