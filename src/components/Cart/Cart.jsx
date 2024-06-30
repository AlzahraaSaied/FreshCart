 import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';


export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null)

  let {getCartItems, updateCartItem,removeCartItem,clearCart} = useContext(CartContext)
  async function getCart(){
    let response = await getCartItems();
    setCartDetails(response);
    console.log(response);
  }
  async function removeItem(productId){
    let response = await removeCartItem(productId);
    setCartDetails(response);
    console.log(response);
  }
  async function clear(){
    let response = await clearCart();
    setCartDetails(response);
    console.log(response);
  }
  async function updateItem(productId,count){
    if(count<1){
      removeItem(productId)
    }
    let response = await updateCartItem(productId,count);
    setCartDetails(response);
    console.log(response);
  }
    useEffect(()=>{
      getCart();
    } , []);

    const calculateTotalPrice = () => {
      if (!cartDetails?.data?.data?.products) return 0;
      return cartDetails.data.data.products.reduce((total, product) => total + product.price * product.count, 0);
    };
  
    // Delivery fee (static for now, can be dynamic)
  
    // Total cost including delivery
    const totalCost = calculateTotalPrice() ;


   
  
  return <>
 <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-6">
  <h2 className='text-center py-5 text-3xl text-green-600 font-semibold'>Shop Cart</h2>
{cartDetails?.data?.numOfCartItems? (
  <button
    className='bg-green-500 text-white rounded-md px-3 py-2 text-center text-lg absolute right-5 top-5'
    onClick={() => clear()}
  >
    <i className="fa-solid fa-trash px-2"></i>Clear
  </button>
) : null}
<Link to={'/products'}><button className='bg-green-500 text-center  font-semibold text-white rounded-md px-3 py-2 text-lg absolute left-5 top-5'>Continue Shopping</button></Link>
  
  <table className="w-75 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-12 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className=" px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>

     {cartDetails?.data?.data?.products?.map((product)=>(
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateItem(product.product.id , product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              {product.count}            </div>
            <button onClick={()=>updateItem(product.product.id,product.count+1)}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price}EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>removeItem(product.product.id)} className=" cursor-pointer font-medium text-green-600 dark:text-green-500 hover:underline">Remove</span>
        </td>

        
      </tr>
    ))}
    
    </tbody>

  </table>
  
  <div className=" text-center py-4">
  <h3 className="text-lg  text-green-600 text-center py-5 "> Price Details</h3>
          <div className="text-lg font-semibold text-gray-700 dark:text-white">
            Total price: {calculateTotalPrice()} <span className='text-green-500'>EGP</span>
          </div>

  </div>

  <Link to='/checkout' className='bg-green-600 ml-10 text-white px-2 py-2 font-semibold rounded-md'>Checkout <i className="fa-brands fa-cc-visa px-2"></i></Link>
</div>


  




  
  </>
}
