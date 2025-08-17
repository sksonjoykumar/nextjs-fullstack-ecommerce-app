const ProductDetailsLoading = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="h-8 w-1/2 bg-gray-300 rounded mb-4 animate-pulse"></div>
      <div className="h-96 bg-gray-300 rounded mb-6 animate-pulse"></div>
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-2 animate-pulse"></div>
      <div className="h-4 w-1/4 bg-gray-300 rounded mb-4 animate-pulse"></div>
      <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
};

export default ProductDetailsLoading;
