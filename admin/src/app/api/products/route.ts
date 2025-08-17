import { connectToDB } from "@/lib/mongodb";
import Collection from "@/models/collection";
import { Product } from "@/models/product";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST Method
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // connectToDB
    await connectToDB();
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    // title and description and media and category and price and expense required
    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create product", {
        status: 400,
      });
    }

    // create newProduct
    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    // save newProduct
    await newProduct.save();

    // return
    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("[Product_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// GET Method
export const GET = async (req: NextRequest) => {
  try {
    // connectToDB
    await connectToDB();
    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("[Product_GET]", error);
    return new NextResponse("Internal server error Get", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
