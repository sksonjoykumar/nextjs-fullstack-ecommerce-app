/* eslint-disable @typescript-eslint/no-explicit-any */
const CollectionInfo = ({ collectionDetails }: { collectionDetails: any }) => {

  return (
    <>
      <div className="mx-auto mt-10 max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-center text-2xl font-semibold text-gray-700">
            {collectionDetails?.title}
          </h2>

          <p className="text-center text-base leading-6 text-gray-700">
            {collectionDetails?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default CollectionInfo;
