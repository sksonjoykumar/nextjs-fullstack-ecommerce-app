import { connectToDB } from '@/lib/mongodb';
import Collection from '@/models/collection';
import { Product } from '@/models/product';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// GET Method
export const GET = async (
  req: NextRequest,
  context: { params: { collectionId: string } }
) => {
  try {
    // extract collectionId safely
    const { collectionId } = context.params;

    // connect to DB
    await connectToDB();

    const collection = await Collection.findById(collectionId).populate({
      path: 'products',
      model: Product,
    });

    // check if collection exists
    if (!collection) {
      return new NextResponse('Collection not found', { status: 404 });
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log('CollectionID_GET', error);
    return new NextResponse('Internal get Server Error', { status: 500 });
  }
};

// POST Method
export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = await auth();
    // check if user is authenticated
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    // connect to DB
    await connectToDB();
    let collection = await Collection.findById(params.collectionId);

    // check if collection exists
    if (!collection) {
      return new NextResponse('Collection not found', { status: 404 });
    }

    // get title and image
    const { title, description, image } = await req.json();

    // check if title and image are provided
    if (!title || !image) {
      return new NextResponse('Title and Image are required', { status: 400 });
    }

    //  update collection
    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );

    //  save
    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log('CollectionID_POST', error);
    return new NextResponse('Internal post Server Error', { status: 500 });
  }
};

// DELETE Method
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDB();

    await Collection.findByIdAndDelete(params.collectionId);

    await Product.updateMany(
      { collections: params.collectionId },
      { $pull: { collections: params.collectionId } }
    );

    return new NextResponse('Collection is deleted', { status: 200 });
  } catch (err) {
    console.log('[collectionId_DELETE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const dynamic = 'force-dynamic';
