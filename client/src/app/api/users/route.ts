import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    // check if userId is available
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // connect to the database
    await connectToDB();

    const user = await User.findOne({ clerkId: userId })
      .populate("wishlist")
      .lean();

    // check if user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // return user data
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("Error in GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
};
