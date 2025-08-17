import { connectToDB } from '@/lib/mongodb';
import Collection from '@/models/collection';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// POST Method
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // connectToDB
    await connectToDB();
    const { title, description, image } = await req.json();

    // existingCollection
    const existingCollection = await Collection.findOne({ title });
    if (existingCollection) {
      return new NextResponse('Collection already exists', { status: 400 });
    }

    // title and image required
    if (!title || !image) {
      return new NextResponse('Title and Image are required', { status: 400 });
    }

    // newCollection
    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    // newCollection save
    await newCollection.save();

    return NextResponse.json(newCollection, { status: 200 });
  } catch (error) {
    console.log('[Collections_POST]', error);
    return new NextResponse('Internal Server error', { status: 500 });
  }
};

// GET Method
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // connectToDB
    await connectToDB();
    const collections = await Collection.find().sort({ createdAt: 'desc' });

    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.log('[Collection_GET]', error);
    return new NextResponse('Internal Server error', { status: 500 });
  }
};
