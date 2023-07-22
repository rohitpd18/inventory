import Product from "@/models/Product"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const product = await request.json()
        console.log(product)
        const productDelete= await Product.findByIdAndDelete(product._id)
        return NextResponse.json({product, status: 200, success: true, massage: "product deleted successfully"})
    } catch (error) {   
        console.log(error)
        return NextResponse.json({status: 500, success: false, massage: error.massage})
        
    }
}