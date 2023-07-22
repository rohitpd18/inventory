import { getUserFromToken } from "@/helper/getUserFromToken"
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const token = request.cookies.get('token')?.value
        const userId= await getUserFromToken(token)
        return NextResponse.json({success: true, userId})
    } catch (error) {
        
    }
        
}