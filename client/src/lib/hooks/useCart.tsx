import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  _id: string;
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (_id: string) => void;
  ingressQuantity: (_id: string) => void;
  degreesQuantity: (_id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addItem: (data: CartItem) => {
        const { item, quantity, size, color } = data;
        const currentItems = get().cartItems;

        const isExisting = currentItems.find(
          (cartItem) => cartItem.item._id === item._id,
        );

        if (isExisting) {
          toast.error("Item already in cart.", { icon: <ShoppingCart /> });
          return;
        }

        set({
          cartItems: [
            ...currentItems,
            { _id: data._id, item, quantity, size, color },
          ],
        });
        toast.success("Item added to cart.", { icon: <ShoppingCart /> });
      },

      removeItem: (_id: string) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== _id,
        );
        set({ cartItems: newCartItems });
        toast.error("Item removed from cart.", { icon: <ShoppingCart /> });
      },

      ingressQuantity: (_id: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
        set({ cartItems: newCartItems });
        toast.success("Quantity increased.");
      },

      degreesQuantity: (_id: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        );
        set({ cartItems: newCartItems });
        toast.success("Quantity decreased.");
      },

      clearCart: () => {
        set({ cartItems: [] });
        localStorage.removeItem("cart-storage");
        toast.success("Cart cleared.");
      },
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
