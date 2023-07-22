import User from "@/models/User";
import { NextResponse } from "next/server";
import connectDB from "@/Config/dbConfig";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

connectDB();

export async function POST (request) {
    const { email, password } = await request.json();
    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json({message: 'User does not exists', success: false, errorField: 'email'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return NextResponse.json({message: 'Invalid Credentials', success: false, errorField: 'password'})
    }

    const tokenData={
        id: user._id,
        email: user.email
    }

    const token= jwt.sign(tokenData, process.env.JWT_SECRET)
    
    const response= NextResponse.json({message: 'Login Successfully', success: true, data: user, token})

    response.cookies.set('token', token, {
        httpOnly: true,
    })
    return response
}