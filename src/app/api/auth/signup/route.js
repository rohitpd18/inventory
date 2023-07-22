import User from "@/models/User";
import { NextResponse } from "next/server";
import connectDB from "@/Config/dbConfig";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const findUser= await User.findOne({email});
    if(findUser){
        return NextResponse.json({message: 'User already exists', success: false, errorField: 'email'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser= await user.save();
    // NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.json({message: 'Sign Up Successfully', success: true, data: savedUser})
  } catch (error) {
    console.log(error);
    NextResponse.redirect(new URL("/signup", request.url));
  }
}
