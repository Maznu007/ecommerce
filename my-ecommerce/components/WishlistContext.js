import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const WishlistContext = createContext({});

export function WishlistProvider({ children }) {
  const { data: session, status } = useSession();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session) {
      fetchWishlist();
    } else if (status === "unauthenticated") {
      setWishlistIds([]);
    }
  }, [session, status]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");
      
      if (!res.ok) {
        console.error("Fetch error:", res.status);
        return;
      }
      
      const data = await res.json();
      // Extract just the IDs for tracking
      const ids = data.wishlist.map(item => item._id.toString());
      setWishlistIds(ids);
    } catch (error) {
      console.error("Fetch wishlist error:", error);
    }
  };

  const addToWishlist = async (productId) => {
    if (status !== "authenticated") {
      alert("Please login first");
      return;
    }
    
    if (wishlistIds.includes(productId)) return;
    
    // Optimistic update
    setWishlistIds([...wishlistIds, productId]);
    
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      
      if (!res.ok) {
        setWishlistIds(wishlistIds.filter(id => id !== productId));
      }
    } catch (error) {
      setWishlistIds(wishlistIds.filter(id => id !== productId));
    }
  };

  const removeFromWishlist = async (productId) => {
    // Optimistic update
    setWishlistIds(wishlistIds.filter(id => id !== productId));
    
    try {
      const res = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      
      if (!res.ok) {
        setWishlistIds([...wishlistIds, productId]);
      }
    } catch (error) {
      setWishlistIds([...wishlistIds, productId]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistIds.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist: wishlistIds,
      wishlistCount: wishlistIds.length,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      loading
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);