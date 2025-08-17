import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";
import ProductsCard from "@/components/ProductsCard";
import { getProductDetails, getProducts } from "@/lib/actions";

// getProductDetails Component
const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  // Extract productId from params
  const { productId } = params;

  // getProducts function to fetch product details
  const productDetails = await getProductDetails(productId);

  // getProducts function to fetch product action
  const products = await getProducts();

  return (
    <>
      <div className="px-4 md:px-16">
        <div className="flex items-start justify-center gap-20 py-10 max-md:flex-col max-md:items-center sm:px-10 md:px-16 xl:px-32">
          {/* Display product details here */}
          <Gallery productMedia={productDetails.media} />
          <ProductInfo productInfo={productDetails} />
        </div>

        <div className="mt-10">
          <div className="">
            {/* Products Heading */}
            <h1 className="text-center text-2xl font-semibold text-gray-700">
              Related Products
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
    </>
  );
};

export default ProductDetails;

export const dynamic = "force-dynamic";