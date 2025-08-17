'use client';

import Loading from '@/app/loading';
import CollectionForm from '@/components/collections/CollectionsForm';
import { useEffect, useState } from 'react';



// CollectionDetails component
const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionsDetails] =
    useState<CollectionType | null>(null);

  // collectionId
  const { collectionId } = params;
  // getCollectionDetails
  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${collectionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCollectionsDetails(data);
      setLoading(false);
    } catch (error) {
      console.log('CollectionDetails-Get', error);
    }
  };

  // useEffect
  useEffect(() => {
    getCollectionDetails();
  }, [collectionId]);

  console.log(collectionDetails);
  // loading
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <CollectionForm initialData={collectionDetails} />
    </>
  );
};

export default CollectionDetails;
