import { getProducts } from "@/lib/actions";
import ProductsCard from "./ProductsCard";

const ProductsList = async () => {
  const products = await getProducts();

  return (
    <>
      <div className="">
        {/* Products Heading */}
        <h1 className="text-center text-4xl font-semibold text-[#FF014F] uppercase">
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
    </>
  );
};

export default ProductsList;
