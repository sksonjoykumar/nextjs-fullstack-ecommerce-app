import { connectToDB } from "@/lib/mongodb";
import Collection from "@/models/collection";
import { Product } from "@/models/product";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET Method
export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
) => {
  // productId
  const { productId } = params;
  try {
    // connectToDB
    await connectToDB();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("[PRODUCT_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

// POST Method
export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
) => {
  // productId
  const { productId } = params;
  try {
    // Check user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        {
          status: 401,
        },
      );
    }
    // connectToDB
    await connectToDB();
    let product = await Product.findById(productId);

    // check if product exists
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    //get all productForm data
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
      return NextResponse.json(
        { message: "Not enough data to update product" },
        { status: 400 },
      );
    }

    // includes a new data, but not in the current data
    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId),
    );

    // includes a data, but not in the current data
    const removeCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId),
    );

    // update collections
    await Promise.all([
      // add new collections
      ...addedCollections.map(async (collectionId: string) => {
        Collection.findByIdAndUpdate(collectionId, {
          $push: {
            products: product._id,
          },
        });
      }),
      //   remove collections
      ...removeCollections.map(async (collectionId: string) => {
        Collection.findByIdAndUpdate(collectionId, {
          $pull: {
            products: product._id,
          },
        });
      }),
    ]);

    // updated product
    product = await Product.findByIdAndUpdate(
      productId,
      {
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
      },
      { new: true },
    ).populate({ path: "collections", model: Collection });

    // save
    await product.save();

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("ProductID_POST", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

// DELETE Method
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
) => {
  // productId
  const { productId } = params;
  try {
    const { userId } = await auth();

    // check user is authenticated
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 },
      );
    }

    // connectToDB
    await connectToDB();

    // check if product exists
    const product = await Product.findOne({ _id: productId });

    // check if product exists
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // delete product
    await Product.findByIdAndDelete(product._id);

    // update collections
    await Promise.all(
      product.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        }),
      ),
    );

    //  return response
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("ProductID_DELETE", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const dynamic = "force-dynamic";
