import connectDB from "@/Config/dbConfig";
import { getUserFromToken } from "@/helper/getUserFromToken";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

connectDB()

export async function GET(request) {
    try {
        const token = request.cookies.get('token')?.value
        const userId= await getUserFromToken(token)
        const product= await Product.find({userId})
        return NextResponse.json({product, status: 200, success: true, massage: "all product find"})
    
    } catch (error) {
        console.log(error)
        return NextResponse.json({status: 500, success: false, massage: error.massage})
    }}