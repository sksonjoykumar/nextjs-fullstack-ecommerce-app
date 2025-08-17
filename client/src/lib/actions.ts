// getCollections function get collections data from admin panel
export const getCollections = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`, {
      cache: "no-store",
      next: { revalidate: 10 },
    });
    return await res.json();
  } catch (error) {
    console.log("GetCollections Error", error);
  }
};

// getCollectionById function get collection data by id from admin panel

export const getCollectionDetails = async (collectionId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,
      {
        cache: "no-store",
        next: { revalidate: 10 },
      },
    );
    return await res.json();
  } catch (error) {
    console.log("getCollectionDetails Error", error);
  }
};

// getProduct function get product data from admin panel
export const getProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: "no-store",
      next: { revalidate: 10 },
    });
    return await res.json();
  } catch (error) {
    console.log("getProducts Error", error);
  }
};

// getProductById function get product data by id from admin panel
export const getProductDetails = async (productId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
      {
        cache: "no-store",
        next: { revalidate: 10 },
      },
    );
    return await res.json();
  } catch (error) {
    console.log("getProductDetails Error", error);
  }
};

// wishList function get user data from admin panel
export const getUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_URL}/users`, {
      cache: "no-store",
      next: { revalidate: 10 },
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    return await res.json();
  } catch (error) {
    console.log("getUser Error", error);
    return null;
  }
};
