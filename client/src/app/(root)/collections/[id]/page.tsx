import CollectionBanner from "@/components/CollectionBanner";
import CollectionInfo from "@/components/CollectionInfo";
import ProductsCard from "@/components/ProductsCard";
import { getCollectionDetails, getProducts } from "@/lib/actions";

// getProductDetails Component
const CollectionDetails = async ({ params }: { params: { id: string } }) => {
  // Extract productId from params
  const { id: collectionId } = params;

  // getCollection function to fetch collection details
  const collectionDetails = await getCollectionDetails(collectionId);

  // getProducts function to fetch product action
  const products = await getProducts();

  return (
    <>
      <div className="px-4 md:px-16">
        <div className="">
          <CollectionBanner collectionDetails={collectionDetails} />
          <CollectionInfo collectionDetails={collectionDetails} />
          <div className="mt-10">
            <div className="">
              {/* Products Heading */}
              <h1 className="text-center text-2xl font-semibold text-gray-700">
                Products
              </h1>

              {/* products Data map */}
              {!products || products.length === 0 ? (
                <p className="text-body-bold">No products found</p>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {products.map((product: ProductType) => (
                    <ProductsCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionDetails;
export const dynamic = "force-dynamic";