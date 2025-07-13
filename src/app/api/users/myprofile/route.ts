import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig"

connectDB()

export async function GET(request: NextRequest) {
    try {
        const userId = getDataFromToken(request);
        const user = await User.findById(userId).select("-password")

        if(!user){
            return NextResponse.json({message: "user not found", success: false})
        }

        return NextResponse.json({
          message: "user found",
          success: true,
          data: user,
        });

    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false });
    }
}