import React, { useContext, useEffect, useState } from 'react';
import Style from './Wishlist.module.css';
import { Link } from 'react-router-dom';
import { WishContext } from '../../context/WishContext';
import toast from 'react-hot-toast';
import { CartContext } from "../../context/CartContext";

export default function Wishlist() {
  const [wishDetails, setWishDetails] = useState(null);

  const { getWishlistItems, removeWishlistItem } = useContext(WishContext);
  const { addToCart } = useContext(CartContext);

  async function getWishlist() {
    try {
      let response = await getWishlistItems();
      setWishDetails(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }

  async function clearItem(productId) {
    try {
      let response = await removeWishlistItem(productId);
      // Fetch the updated wishlist after removing the item
      await getWishlist();
      console.log(response);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  async function addProductToCart(productId) {
    try {
      let response = await addToCart(productId);
      if (response.data.status === 'success') {
        toast('Product is Successfully Added', {
          position: "top-center",
          duration: 1500,
          className: "rounded-md text-md ",
          icon: '👏',
        });
      } else {
        toast('Error in adding the product, Try Again..');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast('Error in adding the product, Try Again..');
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <div className="mt-3">
        <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white text-center">Your Favorite Items</h1>
        <span className='text-lg lg:text-lg tracking-tight leading-8 lg:leading-9 text-green-500 py-3 dark:text-white text-left '>Your Items are: {wishDetails?.data?.count}</span>
      </div>
      <div className="row">
        {wishDetails?.data?.data?.map((product) => (
          <div key={product.id} className="xl:w-1/6 lg:w-3/12 md:w-4/12 px-4 py-7 sm:w-full">
            <div className="product transform transition duration-700 hover:scale-110 hover:border rounded-md border-green-500 relative">
              <i className="fa-solid fa-heart-crack absolute top-3 right-3 text-green-500 text-3xl" onClick={() => clearItem(product.id)}></i>
              <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                <img src={product?.imageCover} alt={product?.title} className='w-full' />
                <span className="block text-green-500 font-semibold mt-2 indent-2">{product?.category?.name}</span>
                <h3 className="text-lg mb-4 font-normal text-gray-700 indent-2">{product?.title?.split(' ').slice(0, 2).join(' ')}</h3>
                <div className="flex item-center justify-between">
                  <span className="indent-2">{product?.price}<span className="pl-1 font-semibold text-green-500">EGP</span></span>
                  <span className="indent-2">{product?.ratingsAverage}<i className="fas fa-star text-yellow-500 "></i></span>
                </div>
              </Link>
              <button className="btn" onClick={() => addProductToCart(product.id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
