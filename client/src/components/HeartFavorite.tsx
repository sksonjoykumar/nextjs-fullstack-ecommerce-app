'use client';

import { useUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// interface
interface HeartFavoriteProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}
// HeartFavorite component
const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
  // router
  const router = useRouter();
  // user
  const { user } = useUser();

  // state
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // getUser Data
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      //check if response is ok
      if (res.ok) {
        setIsLiked(data.wishlist.includes(product._id));
        setLoading(false);
      } else {
        console.error('Failed to fetch user data:', data.error);
      }
    } catch (error) {
      console.log('getUser Error', error);
    }
  };

  // useEffect
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  // handleLiked
  const handleLiked = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (!user) {
        router.push('/sign-in');
        return;
      } else {
        setLoading(true);

        const res = await fetch(`/api/users/wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();

        // check if response is ok
        if (res.ok) {
          setIsLiked(updatedUser.wishlist.includes(product._id));
          updateSignedInUser && updateSignedInUser(updatedUser);
          setLoading(false);
        } else {
          console.error('Failed to update wishlist:', updatedUser.error);
        }
      }
    } catch (error) {
      console.log('handleLiked Error', error);
    }
  };

  // return
  return (
    <>
      <button
        onClick={handleLiked}
        className="cursor-pointer text-red-500 hover:text-[#FF014F]  transition-colors duration-300"
      >
        <Heart fill={isLiked ? 'red' : 'white'} size={20} />
      </button>
    </>
  );
};

export default HeartFavorite;
