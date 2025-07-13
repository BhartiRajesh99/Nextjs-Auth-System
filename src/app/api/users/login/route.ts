import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel.js";
import connectDB from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        if( !email && !password){
            return NextResponse.json(
              { message: "Fields are required", success: false },
              { status: 400 }
            );
        }

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json(
              {
                message: "User not exist",
                success: false,
              },
              { status: 400 }
            );
        }

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({message: "Incorrect Password"},{status: 400});
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})
        const response = NextResponse.json(
          {
            message: "Login Successfull",
            success: true,
          },
          { status: 200 }
        );

        response.cookies.set("token", token, { httpOnly: true})

        return response;
        
    } catch (error: any) {
        return NextResponse.json(
          { message: error.message, success: false },
          { status: 500 }
        );
    }
}