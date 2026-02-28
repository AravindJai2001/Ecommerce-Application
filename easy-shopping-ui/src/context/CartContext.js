import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      toast.info("Quantity increased in cart");
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success("Product Added to cart!");
    }
  }

  function removeFromCart(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.warn("Product remove from cart");
  }

  function clearCart() {
    setCartItems([]);
    toast.warn("Cart cleared");
  }

  function increaseQuantity(id) {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                (item.quantity || 1) < item.stockQuantity
                  ? (item.quantity || 1) + 1
                  : item.quantity,
            }
          : item,
      ),
    );
  }

  function decreaseQuantity(id) {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
          : item,
      ),
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
