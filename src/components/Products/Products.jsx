import React, { useContext, useEffect, useState } from "react";
import Style from "./Products.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../context/WishContext";

export default function Products() {
  let {addToCart,setCartCount,setWishCount} = useContext(CartContext);
  let {addToWishList} = useContext(WishContext);

  async function addProductToCart(productId){
    let response = await addToCart(productId);
    if(response?.data?.status ==='success'){
      toast('Product is Successfully Added'
        ,{
        position:"top-center",
        duration:1500,
        className:"rounded-md text-md ",
        icon: '👏',
      })
    }
    else{
      toast('Error in adding the product, Try Again..')
    }
  }
  async function addProductToWishlist(productId){
    let response = await addToWishList(productId);
    setWishCount(response?.data?.count);
    setCartCount(response?.data?.numOfCartItems)

    if(response.data.status=="success"){
      console.log('added');
    }else{
      console.log('error');
    }
    
  }
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)
  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setProducts(data.data);
        setLoading(false)
      })
      .catch((errors) => {});
  }

  useEffect(() => {
    getProducts();
  }, []);
   
  if(loading){
    return <div className="flex items-center justify-center"><i className="fa fa-spinner fa-spin fa-4x text-green-600" ></i></div>
 
   }
  return (
    <>
   <h2 className="text-center font-serif font-semibold text-2xl text-green-600 mt-10">Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="xl:w-1/6 lg:w-3/12 md:w-4/12 px-4 py-7 sm:w-full " key={product.id}>
            <div className="product transform transition duration-700 hover:scale-110 hover:border rounded-md  border-green-500 relative ">
            <i class="fa-regular fa-heart absolute text-3xl text-green-500 top-2 right-2 z-50" onClick={()=>addProductToWishlist(product.id)}></i>

              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img key={product.id} src={product.imageCover} alt={product.title} className=' w-full'/>
              <span className="block text-green-500 font-semibold mt-2 indent-2">{product.category.name}</span>
              <h3 className="text-lg mb-4 font-normal text-gray-700 indent-2">{product.title.split(' ').slice(0,2).join(' ')}</h3>              
              <div className="flex item-center justify-between">
                <span className="indent-2">{product.price}<span className="pl-1 font-semibold text-green-500">EGP</span></span>
                <span className="indent-2">{product.ratingsAverage}<i className="fas fa-star text-yellow-500 "></i> </span>
              </div>

              </Link>
              <button className="btn"  onClick={()=>addProductToCart(product.id)}>Add to Cart</button>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

