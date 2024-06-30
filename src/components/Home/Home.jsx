import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import axios from "axios";
import RecentProduct from "../RecentProduct/RecentProduct";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  /*const [products, setProducts] = useState([]); // making an empty array by using usestate()

  //calling the api
  async function getProducts() {
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(response.data.data); // set the products in the that empty array.
  }

  useEffect(() => {
    //calling the function of the api
    getProducts();
  }, []);*/
  return (<> 
  <MainSlider/>
   <CategorySlider/>
   <RecentProduct/>
   </>
 
   
  );
}
