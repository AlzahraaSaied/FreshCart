import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {

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
  const [productDetails, setProductDetails] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])

  let {id, category} = useParams();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log({id});


  function getProductDetails(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      console.log(data);
      setProductDetails(data.data)
    })
    .catch(()=>{

    })

  }

  function getRelatedProduct(category){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
      let allProducts=data.data;
      let related =allProducts.filter((product)=>product.category.name==category);
      console.log(related);
      setRelatedProducts(related)
      //console.log(allProducts);
    })
    .catch(()=>{

    })

  }
  
    useEffect(()=>{

      getProductDetails(id);
      getRelatedProduct(category)
    } , [id, category]);

    
    return (
      <>
        <div className="row">
          <div className="w-1/4">
          <Slider {...settings}>
            {productDetails?.images.map((src)=><img src={src} alt={productDetails?.title} className="w-full" />)}
          </Slider>
          </div>
          <div className="w-3/4 p-6">
            <h1 className="text-lg font-semibold text-gray-900">{productDetails?.title}</h1>
            <p className="text-gray-600 indent-2 py-5">{productDetails?.description}</p>
            <span className="font-md text-gray-700">{productDetails?.category?.name}</span>
            <div className="flex item-center justify-between">
              <span className="py-3">
                {productDetails?.price}
                <span className="pl-1 font-semibold text-green-500">EGP</span>
              </span>
              <span className="indent-1">
                {productDetails?.ratingsAverage}
                <i className="fas fa-star text-yellow-500 "></i>
              </span>
            </div>
  
            <button className="btn my-3" onClick={()=>addProductToCart(productDetails._id)}>
              <i className="fa-solid fa-plus px-2" ></i>Add to Cart
            </button>
          </div>
        </div>
  
        <div className="row my-17">
          
          {relatedProducts.map((product) => (
            <div key={product.id} className="w-1/6 px-4 py-7">
              <div className="product  transform transition duration-700 hover:scale-110 hover:border rounded-md  border-green-500 relative">
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} alt={product.title} className="w-full" />
                  <span className="block text-green-500 font-semibold mt-2 indent-2">{product.category.name}</span>
                  <h3 className="text-lg mb-4 font-normal text-gray-700 indent-2">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <div className="flex item-center justify-between">
                    <span className="indent-2">
                      {product.price}
                      <span className="pl-1 font-semibold">EGP</span>
                    </span>
                    <span className="indent-2">
                      {product.ratingsAverage}
                      <i className="fas fa-star text-yellow-500 "></i>
                    </span>
                  </div>
                  <button className="btn" onClick={()=>addProductToCart(productDetails._id)} >Add to Cart</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }