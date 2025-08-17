// import { getUser } from "@/lib/actions";

// const Wishlist = async () => {
//   const wishList = await getUser();
//   console.log(wishList);

//   return (
//     <div>
//       <h1>Wishlist</h1>
//     </div>
//   );
// };

// export default Wishlist;

"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
    } catch (err) {
      console.log("[users_GET", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  console.log(signedInUser?.wishlist);

  return (
    <div className="flex h-[300px] flex-wrap items-center justify-center gap-16">
      <h1>Wishlist</h1>
    </div>
  );
};

export default Wishlist;
export const dynamic = "force-dynamic";
