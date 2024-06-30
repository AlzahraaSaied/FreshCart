import React, { useContext, useEffect, useState } from "react";
import Style from "./RecentProduct.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../context/WishContext";


export default function RecentProduct() {
  let {addToCart} = useContext(CartContext);

  async function addProductToCart(productId){
    let response = await addToCart(productId);
    if(response.data.status ==='success'){
      toast('Product is Successfully Added',{
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
  let {addToWishList} = useContext(WishContext);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  async function addProductToWishlist(productId){
    let response = await addToWishList(productId);
    if(response.data.status=="success"){
      console.log('added');
    }else{
      console.log('error');
    }
    
  }
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function getRecentProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setRecentProducts(data.data);
        setLoading(false);
      })
      .catch((errors) => {});

  }

  useEffect(() => {

    getRecentProduct();
  }, []);
  
  if(loading){
   return <div className="flex items-center justify-center"><i className="fa fa-spinner fa-spin fa-4x text-green-600" ></i></div>

  }
  return (
    <>
      <div className="row">
        {recentProducts.map((product) => (
          <div className="xl:w-1/6 lg:w-3/12 md:w-4/12 px-4 py-7 sm:w-full  ">
            <div className="product relative transform transition duration-700 hover:scale-110 hover:border rounded-md border-green-500  ">
              
            <i class="fa-regular fa-heart absolute text-3xl text-green-500 top-2 right-2 z-50" onClick={()=>addProductToWishlist(product.id)}></i>

              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img key={product.id} src={product.imageCover} alt={product.title} className=' w-full'/>
                            <span className="block text-green-500 font-semibold mt-2 indent-2">{product.category.name}</span>
              <h3 className="text-lg mb-4 font-normal text-gray-700 indent-2">{product.title.split(' ').slice(0,2).join(' ')}</h3>
              {product.ratingsAverage>3.8?<div className="bestseller"><span>Best <br></br>Seller</span></div>:null}
              
              <div className="flex item-center justify-between">
                <span className="indent-2">{product.price}<span className="pl-1 font-semibold text-green-500">EGP</span></span>
                <span className="indent-2">{product.ratingsAverage}<i className="fas fa-star text-yellow-500 "></i> </span>
              </div>
              </Link>
              <button className="btn" onClick={()=>addProductToCart(product.id)}>Add to Cart</button>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}
