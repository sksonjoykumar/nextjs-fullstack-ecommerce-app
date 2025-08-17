import { getCollections } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';

const Collections = async () => {
  // collections data
  const collections = await getCollections();

  return (
    <>
      <div className=" py-8">
        {/* Collections Heading */}
        <h1 className="text-4xl font-semibold text-center uppercase text-[#FF014F] ">
          Collections
        </h1>

        {/* collections Data map */}
        {!collections || collections.length === 0 ? (
          <p className="text-body-bold">No collections found</p>
        ) : (
          <div className="flex items-center justify-center gap-4  flex-wrap md:gap-6 mt-5">
            {collections.map((collection: CollectionType) => (
              <Link
                href={`/collections/${collection._id}`}
                key={collection._id}
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={350}
                  height={250}
                  className=" w-full rounded-md hover:scale-105 transition-all duration-300 ease-in-out border"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Collections;
