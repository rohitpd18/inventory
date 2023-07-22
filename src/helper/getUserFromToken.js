import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import * as jose from 'jose'

export const getUserFromToken= async (token)=>{
    try{
        if(!token) return false
        const secret= new TextEncoder().encode(process.env.JWT_SECRET)
        const decodedToken=await jose.jwtVerify(token, secret)
        return decodedToken.payload.id

    }catch(error){
        console.log(error);
        return NextResponse.json({error: error.message, success: false})
    }
}