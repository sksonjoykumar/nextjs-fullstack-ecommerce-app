
import { connectToDB } from "@/lib/mongodb";
import Collection from "@/models/collection";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const { title, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and Image are required", { status: 400 });
    }

    const existingCollection = await Collection.findOne({ title });
    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    const newCollection = await Collection.create({
      title,
      image,
      userId,
    });

    return NextResponse.json(newCollection, { status: 200 });
  } catch (error) {
    console.error("[Collections_POST]", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
};

// GET
export const GET = async () => {
  try {
    await connectToDB();
    const collections = await Collection.find().sort({ createdAt: "desc" });
    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.error("[Collection_GET]", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
};
