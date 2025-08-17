import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    // check if userId is available
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // connect to the database
    await connectToDB();
    const user = await User.findOne({ clerkId: userId });
    // check if user exists
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // productId from request body
    const { productId } = await req.json();

    // check if productId is available
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    // check if product already exists in wishlist
    const isLiked = user.wishlist.includes(productId);

    // toggle product in wishlist
    if (isLiked) {
      //dislike product

      user.wishlist = user.wishlist.filter(id => id !== productId);
    } else {
      // like product
      user.wishlist.push(productId);
    }

    // save user
    await user.save();

    // return updated user
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log('Error in POST request:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
};
