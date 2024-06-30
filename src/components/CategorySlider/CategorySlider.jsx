import React, { useEffect, useState } from "react";
import Style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay:true
  };
  const [categories, setCategories] = useState([]);

  function getCategory() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((errors) => {});
  }
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
    <div className="py-3"><h4 className="text-green-500 font-bold pb-1 ">Shop Popular Categories</h4>
      <Slider {...settings}>
        
        {categories.map((category) => (
          <div className="bg-gray-100 rounded-sm xl:w-1/6 lg:w-3/12 md:w-4/12 "><div className="p-1 transform transition duration-700 hover:scale-110 ">
            <Link to={`/categorydetails/${category._id}`}>
            <img className="image rounded-sm w-full" src={category.image} alt={category.name} />
            <h3 className="text-center font-light text-gray-800 mt-2">{category.name}</h3>
            </Link>
            
          </div></div>
          
        ))}
      </Slider>
      </div>
      
    </>
  );
}
