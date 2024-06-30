import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishContext = createContext(0);

export default function WishContextProvider(props) {
  let [wishCount, setWishCount] = useState(0);

  let headers = {
    token: localStorage.getItem('userToken')
  };

  useEffect(() => {
    getWishlistItems().then(response => {
      setWishCount(response?.data?.count);
    });
  }, []);

  async function removeWishlistItem(productId) {
    try {
      let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
      setWishCount(response?.data?.count);
      return response;
    } catch (error) {
      console.error('Error removing wishlist item:', error);
      throw error;
    }
  }

  async function addToWishList(productId) {
    try {
      let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers });
      setWishCount(response?.data?.count);
      return response;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  async function getWishlistItems() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
      setWishCount(response?.data?.count);
      return response;
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      throw error;
    }
  }

  return (
    <WishContext.Provider value={{ setWishCount,wishCount, addToWishList, getWishlistItems, removeWishlistItem }}>
      {props.children}
    </WishContext.Provider>
  );
}
