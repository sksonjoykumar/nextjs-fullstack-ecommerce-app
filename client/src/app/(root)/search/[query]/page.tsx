import ProductsCard from "@/components/ProductsCard";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/${params.query}`,
    {
      cache: "no-store",
      next: { revalidate: 10 },
    },
  );
  const searchedProducts = await res.json();
  const decodedQuery = decodeURIComponent(params.query);
  return (
    <>
      <div className="px-10 py-5">
        <h4 className="text-3xl font-semibold text-gray-600">
          Search results for{" "}
          <span className="text-[#0F925C]">({decodedQuery})</span>
        </h4>
        {!searchedProducts ||
          (searchedProducts.length === 0 && (
            <p className="text-body-bold my-5">No result found</p>
          ))}
        <div className="mt-5 flex flex-wrap justify-between gap-16">
          {searchedProducts?.map((product: ProductType) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
export const dynamic = "force-dynamic";