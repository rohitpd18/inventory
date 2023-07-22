import connectDB from "@/Config/dbConfig";
import Product from "@/models/Product"
import { NextResponse } from "next/server";

connectDB()

export async function POST(request) {
    const { productName, category, quantity, sku, userId } = await request.json();
    const isUnique= await Product.findOne({sku})
    if(isUnique){
        return NextResponse.json({message: 'Product already exists', success: false, errorField: 'sku'})
    }

    const product = await Product.create({
        productName,
        category,
        quantity,
        sku,
        userId
    });

    const newProduct= await product.save()

    return NextResponse.json({ message: "Product added successfully", success: true, data: newProduct})
}