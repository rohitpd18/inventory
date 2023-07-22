import connectDB from "@/Config/dbConfig";
import Product from "@/models/Product"
import { NextResponse } from "next/server";

connectDB()

export async function POST(request) {
    const {_id, productName, category, quantity, sku } = await request.json();

    const newProduct= await Product.findByIdAndUpdate(_id,{
        productName,
        category,
        quantity,
        sku
        });


    const saveProduct= await newProduct.save()

    return NextResponse.json({ message: "Product added successfully", success: true, data: saveProduct})
}