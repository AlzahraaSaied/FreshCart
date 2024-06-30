import React, { useEffect, useState } from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setLoading(false)
      })
      .catch((errors) => {});
  }

  useEffect(() => {
    getCategories();
  }, []);
  if(loading){
    return <div className="flex items-center justify-center"><i className="fa fa-spinner fa-spin fa-4x text-green-600" ></i></div>
  }
  return (
    <>
   <h2 className="text-center font-serif font-semibold text-2xl text-green-600 mt-5">Categories</h2>
      <div className="row">
        {categories.map((category) => (
          <div className="sm:w-3/12 md:w-4/12 lg:w-1/6 px-4 py-4 ">
            <div className="category  relative border border-slate-400 rounded-md">
              <Link to={`/categorydetails/${category._id}`}>
              <img key={category._id} src={category?.image} alt={category?.name} className=' w-full rounded-t-md   h-[300px]'/>
              <span className="block text-green-500 font-semibold mt-3 mb-4 indent-2">{category?.name}</span>
              

              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


