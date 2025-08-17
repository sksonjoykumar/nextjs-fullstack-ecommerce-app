'use client';
import Loading from '@/app/loading';
import ProductsForm from '@/components/products/ProductsForm';
import { useEffect, useState } from 'react';



// ProductDetails component
const ProductDetails = ({ params }: { params: { productId: string } }) => {
  // productId
  const { productId } = params;
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  // getProductDetails
  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setProductDetails(data);
    } catch (error) {
      console.log('Products-Get', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect
  useEffect(() => {
    getProductDetails();
  }, [productId]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <ProductsForm initialData={productDetails} />
    </>
  );
};

export default ProductDetails;
