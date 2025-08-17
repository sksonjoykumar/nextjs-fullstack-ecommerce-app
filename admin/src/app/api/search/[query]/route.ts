import { connectToDB } from "@/lib/mongodb";
import { Product } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { query: string } },
) => {
  try {
    connectToDB();
    const searched = await Product.find({
      $or: [
        { title: { $regex: params.query, $options: "i" } },
        { category: { $regex: params.query, $options: "i" } },
        { tags: { $regex: params.query, $options: "i" } },
      ],
    });

    return NextResponse.json(searched, { status: 200 });
  } catch (error) {
    console.log("[SEARCH_GET]", error);
    return NextResponse.json("Search Internal Server Error", { status: 500 });
  }
};
